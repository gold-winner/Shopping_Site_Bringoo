import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { _DeepPartialObject, DeepPartial } from 'chart.js/types/utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pairwise, switchMap, tap } from 'rxjs/operators';

import { AppManagerProductRequestService } from '../../../../../../shared/api/auth/app-manager-product-request.service';
import { CrudProductService } from '../../../../../../shared/api/auth/crud-product.service';
import { CrudProductRequestService } from '../../../../../../shared/api/auth/crud-product-request.service';
import {
  InputError,
  LangCodeEnum,
  ProductEntity,
  ProductRequestApproveInput,
  ProductRequestEntity,
  ProductRequestStatusEnum,
} from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { removeServerErrors } from '../../../../../../shared/helpers/remove-server-errors';
import { setServerErrors } from '../../../../../../shared/helpers/set-server-errors';
import { callValidatorByKey, ValidatorKeyEnum } from '../../../../../../shared/helpers/validator.helper';
import { Pageable } from '../../../../../../shared/interfaces/pageable';
import { ApiService } from '../../../../../../shared/services/api.service';
import { productFieldsConfig } from '../../product-request.config';

@UntilDestroy()
@Component({
  selector: 'app-product-request-detail',
  templateUrl: './product-request-detail.component.html',
  styleUrls: ['./product-request-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutRequestDetailComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});

  productFieldsConfig: any[] = Object.keys(productFieldsConfig).map((key: string) => ({
    key,
    ...productFieldsConfig[key],
  }));

  requestId: string = this.route.snapshot.params['id'];
  productRequestReload: BehaviorSubject<symbol> = new BehaviorSubject<symbol>(Symbol('reload'));
  productRequest$!: Observable<ProductRequestEntity>;
  productData$: BehaviorSubject<DeepPartial<ProductEntity>> = new BehaviorSubject<DeepPartial<ProductEntity>>({});
  applyChangesAll: boolean = false;
  applyChanges: Record<string, boolean> = {};

  productJoin: string[] = ['productBrand||name_i18n', 'category||name_i18n', 'deposit', 'subcategory||name_i18n'];

  join: string[] = [...this.productJoin, 'manager', 'manager.settings||firstName,lastName', 'staff', 'staff.settings||firstName,lastName'];
  productFields: string = Object.keys(productFieldsConfig).join(',');

  fields: string = [
    ...this.productFields.split(','),
    'requestCode',
    'isActive',
    'requestDecisionTime',
    'status',
    'staffNote',
    'managerNote',
    'staffId',
    'managerId',
    'create_date',
  ].join(',');

  dateTimeFormat: string = DATE_TIME_FORMAT;
  timeFormat: string = TIME_FORMAT;
  isLoading$: Observable<boolean> = this.appManagerProductRequestService.isLoading$;

  constructor(
    private readonly crudProductRequestService: CrudProductRequestService,
    private readonly crudProductService: CrudProductService,
    private readonly route: ActivatedRoute,
    private readonly appManagerProductRequestService: AppManagerProductRequestService,
    private readonly apiService: ApiService,
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadProductRequest();

    this.apiService.errors$.pipe(untilDestroyed(this)).subscribe((errors: InputError[]) => {
      if (!errors || errors.length === 0) {
        removeServerErrors(this.form);
      } else {
        setServerErrors(this.form, errors);
      }
    });
  }

  applyChangesAllTopple(): void {
    this.applyChangesAll = !this.applyChangesAll;

    for (const key of Object.keys(this.form.value)) {
      if (key !== 'productId') {
        this.applyChanges[key] = this.applyChangesAll;
      }
    }
  }

  getProductValueByKey(
    product: _DeepPartialObject<ProductEntity>,
    key: any,
  ): _DeepPartialObject<ProductEntity>[keyof _DeepPartialObject<ProductEntity>] {
    const value: _DeepPartialObject<ProductEntity>[keyof _DeepPartialObject<ProductEntity>] =
      product[key as keyof _DeepPartialObject<ProductEntity>];
    return typeof value === 'object' ? JSON.stringify(value) : value;
  }

  approveRequest(): void {
    this.appManagerProductRequestService
      .approveRequest(
        this.requestId,
        (Object.fromEntries(
          Object.entries(this.form.value).filter(([key]: [string, unknown]) => this.applyChanges[key]),
        ) as unknown) as ProductRequestApproveInput,
      )
      .pipe(tap(() => this.loadProductRequest()))
      .subscribe();
  }

  rejectRequest(): void {
    this.appManagerProductRequestService
      .rejectRequest(this.requestId, {})
      .pipe(tap(() => this.loadProductRequest()))
      .subscribe();
  }

  loadProductRequest(): void {
    this.productRequest$ = this.crudProductRequestService
      .findOne(this.requestId, {
        lang: LangCodeEnum.ALL,
        join: this.join,
        fields: this.fields,
      })
      .pipe(
        switchMap((produtRequest: ProductRequestEntity) => {
          return produtRequest.status === ProductRequestStatusEnum.PENDING
            ? of(produtRequest)
            : (this.productRequest$ = this.crudProductRequestService.findOne(this.requestId, {
                join: this.join,
                fields: this.fields,
              }));
        }),
        tap((produtRequest: ProductRequestEntity) => {
          this.form.patchValue(produtRequest);
          this.applyChanges = {};

          for (const key of Object.keys(this.form.value)) {
            this.applyChanges[key] = !!this.form.value[key];
          }

          this.applyChanges['productId'] = true;

          this.loadProduct();
        }),
      );
  }

  private loadProductById(productId: string): void {
    this.crudProductService
      .findOne(productId, {
        join: this.productJoin,
        fields: this.productFields,
      })
      .pipe(
        tap((item: ProductEntity) => {
          this.productData$.next(item);
        }),
      )
      .subscribe();
  }

  private loadProductByEan(ean: string | undefined): void {
    if (!ean) {
      this.productData$.next({});
    } else {
      this.crudProductService
        .find({
          join: this.productJoin,
          fields: this.productFields,
          s: JSON.stringify({
            $and: [{ ean }],
          }),
        })
        .pipe(
          map(({ items }: Pageable & { items?: ProductEntity[] }) => {
            return (items && items[0]) || ({} as ProductEntity);
          }),
          tap((item: ProductEntity) => {
            this.productData$.next(item);
          }),
        )
        .subscribe();
    }
  }

  loadProduct(): void {
    if (this.form.get('productId')?.value) {
      this.loadProductById(this.form.get('productId')?.value);
    } else {
      this.loadProductByEan(this.form.get('ean')?.value);
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      productId: [null],
      ...Object.fromEntries(
        Object.keys(productFieldsConfig).map((key: string) => {
          const value: any[] = [];
          value.push(null);

          if (productFieldsConfig[key].validators) {
            const validators: ValidatorFn[] = [];
            for (const validatorKey of Object.keys(productFieldsConfig[key].validators)) {
              validators.push(
                callValidatorByKey(validatorKey as ValidatorKeyEnum)(productFieldsConfig[key].validators[validatorKey].value),
              );
            }
            value.push(validators);
          }

          return [key, value];
        }),
      ),
    });

    this.form.controls.productId.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe(() => this.loadProduct());

    this.form.controls.ean.valueChanges
      .pipe(untilDestroyed(this), debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.loadProduct());

    this.form.controls.productCategoryCode.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        pairwise<string>(),
        map(([previousValue]: [string, string]) => {
          if (previousValue !== null) {
            this.form.patchValue({ productSubcategoryCode: null });
          }
        }),
      )
      .subscribe();
  }
}

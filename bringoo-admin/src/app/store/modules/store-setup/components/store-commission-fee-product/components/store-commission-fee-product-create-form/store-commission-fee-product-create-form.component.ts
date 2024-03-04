import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format } from 'date-fns';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CrudCommissionFeeStoreService } from '../../../../../../../../shared/api/auth/crud-commission-fee-store.service';
import { CrudProductService } from '../../../../../../../../shared/api/auth/crud-product.service';
import {
  CommissionFeeScaleEnum,
  CommissionFeeStoreCreateInput,
  Pageable,
  ProductEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-commission-fee-product-create-form',
  templateUrl: './store-commission-fee-product-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeProductCreateFormComponent extends DynamicForm<CommissionFeeStoreCreateInput> {
  storeId: string = this.route.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  isLoading$: Observable<boolean> = this.crudCommissionFeeStoreService.isLoading$;
  checked: boolean = false;
  setOfChecked: Set<string> = new Set<string>();
  limit = 20;
  total = 0;
  nzPageSizeOptions: number[] = [20, 30, 50];

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  @Input() set submit(symbol: symbol | undefined) {
    if (symbol) {
      this.onSubmit();
    }
  }

  productFilter: BehaviorSubject<any> = new BehaviorSubject<any>({
    page: 1,
    limit: this.limit,
  });

  defaultFormValue: Partial<CommissionFeeStoreCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'],
    commissionFeeScale: CommissionFeeScaleEnum.PRODUCT,
    dateStart: format(new Date(), DATE_FORMAT),
  };

  filterForm: UntypedFormGroup = this.fb.group({
    search: [null],
    productCategoryCode: [null],
    productSubcategoryCode: [null],
    productBrandCode: [null],
    productTags: [null],
  });

  items: Observable<ProductEntity[]> = this.productFilter.asObservable().pipe(
    untilDestroyed(this),
    switchMap((productFilter: any) => {
      const $and: { [p: string]: any }[] = [];

      if (productFilter.search) {
        $and.push({
          $or: [
            {
              name_i18n: { $contL: productFilter.search },
            },
            {
              'productBrand.name_i18n': { $contL: productFilter.search },
            },
            {
              'category.name_i18n': { $contL: productFilter.search },
            },
            {
              'subcategory.name_i18n': { $contL: productFilter.search },
            },
          ],
        });
      }

      if (productFilter.productCategoryCode) {
        $and.push({ productCategoryCode: productFilter.productCategoryCode });
      }

      if (productFilter.productSubcategoryCode) {
        $and.push({ productSubcategoryCode: productFilter.productSubcategoryCode });
      }

      if (productFilter.productBrandCode) {
        $and.push({ productBrandCode: productFilter.productBrandCode });
      }

      return this.crudProductService
        .find({
          s: JSON.stringify({ $and }),
          join: ['productBrand', 'category', 'subcategory'],
          limit: productFilter.limit,
          page: productFilter.page,
        })
        .pipe(
          tap((v: Pageable & { items?: ProductEntity[] }) => (this.total = v.total)),
          map((v: Pageable & { items?: ProductEntity[] }) => v?.items || []),
        );
    }),
  );

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crudCommissionFeeStoreService: CrudCommissionFeeStoreService,
    private readonly crudProductService: CrudProductService,
  ) {
    super();
    this.buildForm();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.limit = params.pageSize;
    const search: any = {
      ...this.productFilter.getValue(),
      page: params.pageIndex,
      limit: params.pageSize,
    };
    this.productFilter.next(search);
  }

  isAvailableForCheck(item: ProductEntity): boolean {
    return !!(item && item.isActive && item.category?.isActive && item.subcategory?.isActive);
  }

  onAllChecked(status: boolean, products: ProductEntity[]): void {
    for (const product of products) {
      status ? this.setOfChecked.add(product.id) : this.setOfChecked.delete(product.id);

      if (!this.isAvailableForCheck(product)) {
        this.setOfChecked.delete(product.id);
      }
    }

    this.form.patchValue({ productIds: [...this.setOfChecked] });
  }

  onItemChecked(id: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(id);
    } else {
      this.setOfChecked.delete(id);
    }
    this.form.patchValue({ productIds: [...this.setOfChecked] });
  }

  onSubmit(): void {
    this.crudCommissionFeeStoreService.createMultiple(this.form.value).subscribe(() => {
      this.productFilter.next({ ...this.productFilter.getValue() });
      this.setOfChecked.clear();
      this.formSubmit.emit(Symbol('a'));
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      commissionFeeScale: [null, [Validators.required]],
      percent: [null, [Validators.required]],
      min: [null, [Validators.required]],
      max: [null, [Validators.required]],
      productIds: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
    });

    this.form.reset(this.defaultFormValue);

    this.filterForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        ({
          search,
          productCategoryCode,
          productSubcategoryCode,
          productBrandCode,
          productTags,
        }: {
          search: string;
          productCategoryCode: string;
          productSubcategoryCode: string;
          productBrandCode: string;
          productTags: string;
        }) => {
          this.productFilter.next({
            ...(search && { search }),
            ...(productCategoryCode && { productCategoryCode }),
            ...(productSubcategoryCode && { productSubcategoryCode }),
            ...(productBrandCode && { productBrandCode }),
            ...(productTags && { productTags }),
            limit: this.limit,
            page: 1,
          });
        },
      );
  }
}

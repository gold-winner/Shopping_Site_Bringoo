import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CrudVatService } from '../../../../../../shared/api/auth/crud-vat.service';
import { FindInput, Pageable, ProductPriceViewEntity, VatEntity } from '../../../../../../shared/api/auth/data-contracts';
import { ProductPriceViewService } from '../../../../../../shared/api/auth/product-price-view.service';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-product-pricing-crud',
  templateUrl: './product-pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPricingComponent implements OnInit {
  fields: string = [
    'name_i18n',
    'productId',
    'productCategoryCode',
    'productSubcategoryCode',
    'productMeasurement',
    'productUnitCode',
    'price',
    'productVatPercent',
    'baseMeasurement',
    'weight',
    'storeId',
  ].join(',');

  form!: UntypedFormGroup;

  join: string[] = [];

  queryParams: BehaviorSubject<FindInput> = new BehaviorSubject<FindInput>({
    fields: this.fields,
    join: this.join,
    limit: 20,
  });

  vatCodeSelect: SelectOptions<VatEntity> = {
    service: this.vatService,
    fields: ['name_i18n', 'code', 'value'],
    //todo change on vat code
    valueKey: 'value',
    getLabel(item: VatEntity): string {
      return `${item.value} %`;
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  isLoading$: Observable<boolean> = this.service.isLoading$;
  items: ProductPriceViewEntity[] = [];
  page: number = 1;
  total: number = 0;
  limit: number = 10;
  nzPageSizeOptions: number[] = [10, 20, 30, 50, 100];
  checkedPage: boolean = false;
  setOfChecked: Set<string> = new Set<string>();

  constructor(
    private service: ProductPriceViewService,
    private route: ActivatedRoute,
    private readonly vatService: CrudVatService,
    private readonly fb: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getProductLinks();
  }

  buildForm(): void {
    this.form = this.fb.group({
      vat: this.fb.array([]),
      price: this.fb.array([]),
    });
  }

  createProductPriceArray(items: ProductPriceViewEntity[]): void {
    this.vats.clear();
    this.prices.clear();
    for (const productPrice of items) {
      //todo change on vat code
      this.vats.push(this.fb.control(`${productPrice.productVatPercent}`));
      this.prices.push(this.fb.control(productPrice.price));
    }
  }

  get vats(): UntypedFormArray {
    return this.form.get('vat') as UntypedFormArray;
  }

  get prices(): UntypedFormArray {
    return this.form.get('price') as UntypedFormArray;
  }

  getProductLinks(): void {
    this.queryParams
      .asObservable()
      .pipe(
        untilDestroyed(this),
        switchMap((query: FindInput) => this.service.find({ ...query })),
      )
      .subscribe((productView: Pageable & { items?: ProductPriceViewEntity[] }) => {
        this.items = productView.items ?? [];
        this.total = productView.total;
        if (productView.items) {
          this.createProductPriceArray(productView.items);
        }
      });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const sort: string[] = params.sort
      .map(({ key, value }: { key: string; value: NzTableSortOrder }): string =>
        value ? `${key},${value === 'ascend' ? 'ASC' : 'DESC'}` : '',
      )
      .filter((v: string) => v !== '');

    const search: FindInput = {
      ...this.queryParams.getValue(),
      ...(sort.length > 0 && { sort }),
      page: params.pageIndex,
      limit: params.pageSize,
      join: this.join,
    };
    this.queryParams.next(search);
  }

  onAllChecked(status: boolean): void {
    if (status) {
      for (const v of this.items) {
        v.productId && this.setOfChecked.add(v.productId);
      }
    } else {
      for (const v of this.items) {
        v.productId && this.setOfChecked.delete(v.productId);
      }
    }
  }

  onItemChecked(value: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(value);
    } else {
      this.setOfChecked.delete(value);
    }
  }

  onFiltersChange(query: FindInput): void {
    this.queryParams.next({
      ...this.queryParams.getValue(),
      ...query,
    });
  }

  //todo add update form and show it
  onShowUpdateForm(): void {}

  //todo delete price from crud-product-price not a link
  onDelete(): void {}
}

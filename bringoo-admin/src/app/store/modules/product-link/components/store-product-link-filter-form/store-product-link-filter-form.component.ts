import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { CrudProductBrandService } from '../../../../../../shared/api/auth/crud-product-brand.service';
import { CrudProductCategoryService } from '../../../../../../shared/api/auth/crud-product-category.service';
import { CrudProductSubcategoryService } from '../../../../../../shared/api/auth/crud-product-subcategory.service';
import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { FindInput, ProductBrandEntity, ProductCategoryEntity, StoreEntity } from '../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { DepositShowStatusesType } from '../../../../../../shared/types/deposit-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-product-price-request-filter',
  templateUrl: './store-product-link-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkFilterFormComponent extends DynamicFilterFormComponent {
  storeSelect: SelectOptions<StoreEntity> = {
    service: this.crudStoreService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: StoreEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  categorySelect: SelectOptions<ProductCategoryEntity> = {
    service: this.crudProductCategoryService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductCategoryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  subCategorySelect: SelectOptions<ProductCategoryEntity> = {
    service: this.crudProductSubcategoryService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductCategoryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  brandSelect: SelectOptions<ProductBrandEntity> = {
    service: this.crudProductBrandService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductBrandEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  isDepositFilterStates: DepositShowStatusesType[] = ['Show deposits', 'Hide deposits', 'Show ALL'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    store: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
    subCategory: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null),
    isDeposit: new FormControl<DepositShowStatusesType>('Show ALL') as FormControl<DepositShowStatusesType>,
  });

  constructor(
    private readonly route: ActivatedRoute,
    private crudStoreService: CrudStoreService,
    private crudProductCategoryService: CrudProductCategoryService,
    private crudProductSubcategoryService: CrudProductSubcategoryService,
    private crudProductBrandService: CrudProductBrandService,
  ) {
    super();
  }

  beforeInit(): void {
    this.form.controls.category.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        map((v: string | null) => {
          this.form.patchValue({ subCategory: null });
          this.subCategorySelect = v
            ? {
                ...this.subCategorySelect,
                filter: [['categoryCode', CondOperator.EQUALS, v].join('||')],
              }
            : { ...this.subCategorySelect, filter: [] };
          return v;
        }),
      )
      .subscribe();
  }

  mapSearch(filters: typeof this.form.value): FindInput {
    this.formSubmit.emit(filters as FindInput);

    if (!filters.search) {
      return {
        s: JSON.stringify({
          $and: [...this.createDefaultFilters(filters)],
        }),
      };
    }
    const str: string = JSON.stringify({
      $and: [
        ...this.createDefaultFilters(filters),
        {
          $or: [
            {
              'product.name_i18n': { $contL: filters.search },
            },
            {
              'product.productBrand.name_i18n': { $contL: filters.search },
            },
            {
              'product.category.name_i18n': { $contL: filters.search },
            },
            {
              'product.subcategory.name_i18n': { $contL: filters.search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }

  private createDefaultFilters({ category, subCategory, brand, isDeposit, store }: typeof this.form.value): { [p: string]: any }[] {
    const $and: { [p: string]: any }[] = [];

    if (category) {
      $and.push({ 'product.productCategoryCode': category });
    }
    if (subCategory) {
      $and.push({ 'product.productSubcategoryCode': subCategory });
    }
    if (brand) {
      $and.push({ 'product.productBrandCode': brand });
    }
    if (store) {
      $and.push({ 'store.code': store });
    }
    if (isDeposit !== 'Show ALL') {
      $and.push({
        'product.depositId': isDeposit === 'Hide deposits' ? { $isnull: true } : { $notnull: true },
      });
    }

    return $and;
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { CrudProductBrandService } from '../../../../../../../../shared/api/auth/crud-product-brand.service';
import { CrudProductCategoryService } from '../../../../../../../../shared/api/auth/crud-product-category.service';
import { CrudProductSubcategoryService } from '../../../../../../../../shared/api/auth/crud-product-subcategory.service';
import { FindInput, ProductBrandEntity, ProductCategoryEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { ActiveShowStatusesType } from '../../../../../../../../shared/types/active-show-statuses.type';
import { DepositShowStatusesType } from '../../../../../../../../shared/types/deposit-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-product-price-request-filter',
  templateUrl: './store-product-link-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkFilterFormComponent extends DynamicFilterFormComponent {
  id: string = '';

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
  isStatusFilterStates: ActiveShowStatusesType[] = ['Show Active', 'Show Inactive', 'Show ALL'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
    subCategory: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null),
    isDeposit: new FormControl('Show ALL') as FormControl<DepositShowStatusesType>,
    isActive: new FormControl('Show ALL') as FormControl<ActiveShowStatusesType>,
  });

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private crudProductCategoryService: CrudProductCategoryService,
    private crudProductSubcategoryService: CrudProductSubcategoryService,
    private crudProductBrandService: CrudProductBrandService,
  ) {
    super();
  }

  private createDefaultFilters({ category, subCategory, brand, isDeposit, isActive }: typeof this.form.value): any {
    const and: any[] = [];
    if (category) {
      and.push({ 'product.productCategoryCode': category });
    }
    if (subCategory) {
      and.push({ 'product.productSubcategoryCode': subCategory });
    }
    if (brand) {
      and.push({ 'product.productBrandCode': brand });
    }
    if (isDeposit !== 'Show ALL') {
      and.push({
        'product.depositId': isDeposit === 'Hide deposits' ? { $isnull: true } : { $notnull: true },
      });
    }
    if (isActive && isActive !== 'Show ALL') {
      and.push({
        'product.isActive': isActive === 'Show Active',
      });
    }

    return and;
  }

  mapSearch(filters: typeof this.form.value): FindInput {
    this.formSubmit.emit(filters as FindInput);
    const $and: any[] = [{ storeId: this.id }, ...this.createDefaultFilters(filters)];

    if (filters.search) {
      $and.push({
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
      });
    }
    return { s: JSON.stringify({ $and }) };
  }

  beforeInit(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];

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
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudProductBrandService } from '../../../../../../../../shared/api/auth/crud-product-brand.service';
import { CrudProductCategoryService } from '../../../../../../../../shared/api/auth/crud-product-category.service';
import { CrudProductSubcategoryService } from '../../../../../../../../shared/api/auth/crud-product-subcategory.service';
import { FindInput, ProductBrandEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { filters } from '../../../../../../../../shared/types/filters.type';

@UntilDestroy()
@Component({
  selector: 'app-store-out-of-stock-filter-form',
  templateUrl: './store-out-of-stock-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOutOfStockFilterFormComponent extends DynamicFilterFormComponent {
  id: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly crudProductCategoryService: CrudProductCategoryService,
    private readonly crudProductSubcategoryService: CrudProductSubcategoryService,
    private readonly crudProductBrandService: CrudProductBrandService,
  ) {
    super();
  }

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

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
    subCategory: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null),
    includeExpired: new FormControl<boolean>(false) as FormControl<boolean>,
  });

  beforeInit(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  }

  mapSearch(filters: filters): FindInput {
    this.formSubmit.emit(filters as FindInput);
    const findInput: FindInput = {};

    const $and: any[] = [{ 'productLink.storeId': this.id }, ...this.createDefaultFilters(filters)];

    if (filters.search) {
      $and.push({
        $or: [
          { 'product.name_i18n': { $contL: filters.search } },
          { 'productBrand.name_i18n': { $contL: filters.search } },
          { 'productCategory.name_i18n': { $contL: filters.search } },
          { 'productSubcategory.name_i18n': { $contL: filters.search } },
        ],
      });
    }

    findInput.s = JSON.stringify({ $and });

    return findInput;
  }

  private createDefaultFilters({ category, subCategory, brand, includeExpired }: filters): any[] {
    const $and: any[] = [];

    if (category) {
      $and.push({ 'productLink.product.productCategoryCode': category });
    }
    if (subCategory) {
      $and.push({ 'productLink.product.productSubcategoryCode': subCategory });
    }
    if (brand) {
      $and.push({ 'productLink.product.productBrandCode': brand });
    }
    if (!includeExpired) {
      $and.push({ endDateTime: { $gte: new Date().toISOString() } });
    }

    return $and;
  }
}

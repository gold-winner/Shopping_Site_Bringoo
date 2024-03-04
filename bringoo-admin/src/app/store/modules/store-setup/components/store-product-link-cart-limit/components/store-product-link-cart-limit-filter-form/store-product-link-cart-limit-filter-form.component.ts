import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-product-link-cart-limit-filter-form',
  templateUrl: './store-product-link-cart-limit-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkCartLimitFilterFormComponent extends DynamicFilterFormComponent {
  id: string = '';

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
    subCategory: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null),
    includeExpired: new FormControl(false) as FormControl<boolean>,
  });

  beforeInit(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  }

  mapSearch(filters: typeof this.form.value): FindInput {
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

  private createDefaultFilters({ category, subCategory, brand, includeExpired }: typeof this.form.value): any[] {
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

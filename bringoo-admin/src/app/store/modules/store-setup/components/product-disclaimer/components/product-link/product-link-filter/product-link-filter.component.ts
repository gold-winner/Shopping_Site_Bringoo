import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DepositShowStatusesType } from '../../../../../../../../../shared/types/deposit-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-product-link-filter',
  templateUrl: 'product-link-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLinkFilterComponent extends DynamicFilterFormComponent {
  isDepositFilterStates: DepositShowStatusesType[] = ['Show deposits', 'Hide deposits', 'Show ALL'];
  defaultFormValue: any = {
    storeId: this.route.snapshot.parent?.parent?.params['id'],
  };

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
    subCategory: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null),
    isDeposit: new FormControl<DepositShowStatusesType>('Show ALL') as FormControl<DepositShowStatusesType>,
    storeId: new FormControl<string>(this.route.snapshot.parent?.parent?.params['id']) as FormControl<string>,
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch(filters: typeof this.form.value): FindInput {
    this.formSubmit.emit(filters as FindInput);
    const $and: any[] = [{ storeId: filters.storeId }, ...this.createDefaultFilters(filters)];

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

  private createDefaultFilters({ category, subCategory, brand, isDeposit }: typeof this.form.value): any {
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

    return and;
  }
}

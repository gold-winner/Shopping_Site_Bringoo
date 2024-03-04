import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-product-category-filter-form',
  templateUrl: './product-category-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoryFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
    vendorCategoryCodes: new FormControl<string[] | null>([]),
  });

  mapSearch({ search, vendorCategoryCodes }: typeof this.form.value): FindInput {
    const $and: any[] = [];

    if (search) {
      $and.push({
        $or: [
          { name_i18n: { [CondOperator.CONTAINS_LOW]: search.toLowerCase() } },
          { code: { [CondOperator.CONTAINS_LOW]: search.toLowerCase() } },
        ],
      });
    }
    if (vendorCategoryCodes) {
      vendorCategoryCodes = Array.isArray(vendorCategoryCodes) ? vendorCategoryCodes : [vendorCategoryCodes];
      $and.push({
        $or: vendorCategoryCodes.map((vendorCategoryCode: string) => ({ vendorCategoryCode })),
      });
    }

    return {
      ...($and.length > 0 && { s: JSON.stringify({ $and }) }),
      sort: ['order,ASC'],
    };
  }
}

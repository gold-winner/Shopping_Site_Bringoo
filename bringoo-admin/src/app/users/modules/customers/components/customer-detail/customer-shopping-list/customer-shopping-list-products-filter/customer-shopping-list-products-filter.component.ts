import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-shopping-list-products-filter',
  templateUrl: './customer-shopping-list-products-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerShoppingListProductsFilterComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return {
        s: JSON.stringify({}),
      };
    }
    const str: string = JSON.stringify({
      $or: [
        {
          name: { $cont: search },
        },
        {
          'productLink.product.name_i18n': { $contL: search },
        },
      ],
    });
    return { s: str };
  }
}

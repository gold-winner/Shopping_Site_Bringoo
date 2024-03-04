import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-shopping-list-filter',
  templateUrl: './customer-shopping-list-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerShoppingListFilterComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return {
        s: JSON.stringify({
          customerId: this.route.snapshot.params['id'],
        }),
      };
    }
    const str: string = JSON.stringify({
      $and: [
        {
          customerId: this.route.snapshot.params['id'],
        },
        {
          $or: [
            {
              name: { $cont: search },
            },
            {
              'store.name_i18n': { $contL: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}

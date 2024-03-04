import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CustomerRoleEnum, FindInput } from '../../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-select-customer-filter-form',
  templateUrl: './select-customer-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomerFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return { s: JSON.stringify({ role: CustomerRoleEnum.CUSTOMER }) };
    }
    const str: string = JSON.stringify({
      $and: [
        { role: CustomerRoleEnum.CUSTOMER },
        {
          $or: [
            {
              'settings.firstName': { $cont: search },
            },
            {
              'settings.lastName': { $cont: search },
            },
            {
              'settings.customerNumber': { $cont: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}

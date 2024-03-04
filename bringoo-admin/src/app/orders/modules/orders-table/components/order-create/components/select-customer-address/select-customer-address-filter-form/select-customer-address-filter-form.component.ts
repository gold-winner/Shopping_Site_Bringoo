import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CustomerIdService } from '../../services/customer-id-service';

@UntilDestroy()
@Component({
  selector: 'app-select-customer-address-filter-form',
  templateUrl: './select-customer-address-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomerAddressFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private customerIdService: CustomerIdService) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return {
        s: JSON.stringify({
          customerId: this.customerIdService.customerId,
        }),
      };
    }
    const str: string = JSON.stringify({
      $and: [
        { customerId: this.customerIdService.customerId },
        {
          $or: [
            {
              addressName: { $contL: search },
            },
            {
              'country.name_i18n': { $contL: search },
            },
            {
              city: { $contL: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}

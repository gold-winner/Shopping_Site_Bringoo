import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-product-management-filter-form',
  templateUrl: './customer-loyalty-program-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerLoyaltyProgramFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    const s: any = { $and: [] };

    s.$and.push({ customerId: this.route.snapshot.params['id'] });

    if (search) {
      s.$and.push({
        $or: [
          {
            'loyaltyProgram.name_i18n': { $contL: search },
          },
          {
            'loyaltyProgram.code': { $contL: search },
          },
          {
            cardNumber: { $contL: search },
          },
        ],
      });
    }

    return { s: JSON.stringify(s) };
  }
}

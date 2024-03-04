import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CustomerBonusTypeEnum, FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-bonus-filter-form',
  templateUrl: './customer-bonus-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBonusFilterFormComponent extends DynamicFilterFormComponent {
  bonusTypes: string[] = Object.values(CustomerBonusTypeEnum);

  form = new FormGroup({
    bonusType: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ bonusType }: typeof this.form.value): FindInput {
    const $and: any[] = [{ customerId: this.route.snapshot.params['id'] }];

    if (bonusType) {
      $and.push({ bonusType });
    }

    const s: string = JSON.stringify({ $and });
    return { s, sort: ['create_date,DESC'] };
  }
}

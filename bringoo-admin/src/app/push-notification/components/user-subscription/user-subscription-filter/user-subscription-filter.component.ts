import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FindInput } from '../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../shared/modules/crud/enums/cond-operator';

@Component({
  selector: 'app-user-subscription-filter',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSubscriptionFilterComponent extends DynamicFilterFormComponent {
  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch(): FindInput {
    return {
      filter: [['userId', CondOperator.EQUALS, this.route.snapshot.params['id']].join('||')],
      sort: ['create_date,DESC'],
    };
  }
}

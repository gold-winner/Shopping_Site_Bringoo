import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FindInput, OrderStatusEnum } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';

@Component({
  selector: 'app-staff-order-history-filter',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffOrderHistoryFilterComponent extends DynamicFilterFormComponent {
  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch(): FindInput {
    return {
      filter: [
        ['jobs.staffId', CondOperator.EQUALS, this.route.snapshot.params['id']].join('||'),
        ['orderStatus', CondOperator.NOT_EQUALS, OrderStatusEnum.CANCELED].join('||'),
      ],
    };
  }
}

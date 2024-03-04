import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-staff-session-history-filter',
  templateUrl: './staff-session-history-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffSessionHistoryFilterComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch(): FindInput {
    return {
      filter: [['staffId', CondOperator.EQUALS, this.route.snapshot.params['id']].join('||')],
      sort: ['create_date,DESC'],
    };
  }
}

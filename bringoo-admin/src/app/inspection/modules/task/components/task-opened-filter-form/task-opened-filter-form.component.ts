import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-task-opened-filter-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskOpenedFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(public readonly route: ActivatedRoute) {
    super();
  }

  mapSearch(): FindInput {
    const s: any = { $and: [] };

    s.$and.push({ isDone: false });

    return { s: JSON.stringify(s), sort: ['create_date,DESC'] };
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { UserSearchFilter } from '../../../../../../shared/helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-task-closed-filter-form',
  templateUrl: './task-closed-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskClosedFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    const s: any = { $and: [] };

    s.$and.push({ isDone: true });

    if (search) {
      s.$and.push({
        $or: [
          {
            body_i18n: { $contL: search },
          },
          ...UserSearchFilter(search, 'manager.settings'),
        ],
      });
    }

    return { s: JSON.stringify(s), sort: ['create_date,DESC'] };
  }
}

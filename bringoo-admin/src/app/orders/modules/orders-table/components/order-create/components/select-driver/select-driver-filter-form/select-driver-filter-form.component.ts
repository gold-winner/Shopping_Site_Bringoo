import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, StaffRoleEnum } from '../../../../../../../../../shared/api/auth/data-contracts';
import { UserSearchFilter } from '../../../../../../../../../shared/helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-select-driver-filter-form',
  templateUrl: './select-driver-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDriverFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return {
        s: JSON.stringify({
          '$and': [{ role: { $ne: StaffRoleEnum.UNASSIGNED } }, { role: { $ne: StaffRoleEnum.PICKER } }],
          'settings.isActive': true,
        }),
      };
    }
    const str: string = JSON.stringify({
      $and: [
        { role: { $notin: [StaffRoleEnum.UNASSIGNED, StaffRoleEnum.PICKER] } },
        {
          'settings.isActive': true,
        },
        {
          $or: [
            ...UserSearchFilter(search, 'settings'),
            {
              'settings.staffNumber': { $cont: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}

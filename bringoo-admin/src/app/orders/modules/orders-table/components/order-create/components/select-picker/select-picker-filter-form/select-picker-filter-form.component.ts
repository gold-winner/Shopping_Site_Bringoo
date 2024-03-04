import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, StaffRoleEnum } from '../../../../../../../../../shared/api/auth/data-contracts';
import { UserSearchFilter } from '../../../../../../../../../shared/helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-select-picker-filter-form',
  templateUrl: './select-picker-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPickerFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return {
        s: JSON.stringify({
          '$and': [{ role: { $ne: StaffRoleEnum.UNASSIGNED } }, { role: { $ne: StaffRoleEnum.DRIVER } }],
          'settings.isActive': true,
        }),
      };
    }
    const str: string = JSON.stringify({
      $and: [
        { role: { $notin: [StaffRoleEnum.UNASSIGNED, StaffRoleEnum.DRIVER] } },
        {
          'settings.isActive': true,
        },
        {
          $or: [
            ...UserSearchFilter(search, 'settings'),
            {
              'settings.staffNumber': { $contL: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}

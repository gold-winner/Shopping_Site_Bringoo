import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, StaffRoleEnum } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-users-staff-filter-form',
  templateUrl: './filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent extends DynamicFilterFormComponent {
  roleList: string[] = Object.keys(StaffRoleEnum);
  employeeTypes: string[] = ['All', 'External', 'Inhouse'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    role: new FormControl<null | 'UNASSIGNED' | 'DRIVER' | 'PICKER' | 'PICKER_DRIVER'>(null),
    status: new FormControl('active') as FormControl<'all' | 'deleted' | 'active'>,
    employeeType: new FormControl('All') as FormControl<'All' | 'External' | 'Inhouse'>,
  });

  mapSearch({ search, role, status, employeeType }: typeof this.form.value): FindInput {
    const s: any = { $and: [] };

    if (role) {
      s.$and.push({ role });
    }
    if (status === 'deleted') {
      s.$and.push({ deleted_date: { $notnull: true } });
    }
    if (search) {
      const [firstName, lastName] = search.split(' ');
      s.$and.push({
        $or: [
          {
            email: { $contL: search },
          },
          {
            'settings.firstName': { $contL: firstName },
          },
          {
            'settings.lastName': { $contL: lastName || firstName },
          },
          {
            'settings.staffNumber': { $contL: search },
          },
        ],
      });
    }

    if (employeeType !== 'All') {
      s.$and.push({ isExternalEmployee: employeeType === 'External' });
    }

    return { s: JSON.stringify(s), sort: ['create_date,DESC'], softDelete: status !== 'active' };
  }
}

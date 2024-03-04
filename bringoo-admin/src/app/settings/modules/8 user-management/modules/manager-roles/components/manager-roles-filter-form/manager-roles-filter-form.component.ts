import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-manager-roles-filter-form',
  templateUrl: 'manager-roles-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerRolesFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    return { ...(search && { s: JSON.stringify({ code: { $contL: search } }) }) };
  }
}

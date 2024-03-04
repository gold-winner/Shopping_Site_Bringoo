import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ManagerRoleUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-manager-roles-update-form',
  templateUrl: './manager-roles-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerRolesUpdateFormComponent extends DynamicForm<ManagerRoleUpdateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      id: [null],
      code: [null, [Validators.required]],
      description: [null],
    });
  }
}

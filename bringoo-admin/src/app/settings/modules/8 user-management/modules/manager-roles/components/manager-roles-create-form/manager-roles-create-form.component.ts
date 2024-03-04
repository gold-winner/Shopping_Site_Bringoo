import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ManagerRoleCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-manager-roles-create-form',
  templateUrl: './manager-roles-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerRolesCreateFormComponent extends DynamicForm<ManagerRoleCreateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      description: [null],
    });
  }
}

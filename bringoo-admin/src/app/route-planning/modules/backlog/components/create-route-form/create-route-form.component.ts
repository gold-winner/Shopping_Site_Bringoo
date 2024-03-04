import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { RouteCreateInput, StaffRoleEnum } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-create-route-form',
  templateUrl: 'create-route-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRouteFormComponent extends DynamicForm<RouteCreateInput> {
  staffRoles: StaffRoleEnum[] = [StaffRoleEnum.DRIVER, StaffRoleEnum.PICKER_DRIVER];
  dateTimeFormat: string = DATE_TIME_FORMAT;

  defaultFormValue: Partial<RouteCreateInput> = {
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      provideComment: [null],
      code: [null, [Validators.required]],
      driverAssignedId: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      dateTimeStart: [null, [Validators.required]],
      dateTimeEnd: [null, [Validators.required]],
    });
  }
}

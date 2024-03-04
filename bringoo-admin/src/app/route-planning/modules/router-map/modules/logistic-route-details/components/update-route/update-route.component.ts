import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { RouteUpdateInput, StaffRoleEnum } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-update-route',
  templateUrl: 'update-route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateRouteComponent extends DynamicForm<RouteUpdateInput> {
  dateTimeFormat: string = DATE_TIME_FORMAT;

  staffRoles: StaffRoleEnum[] = [StaffRoleEnum.PICKER_DRIVER, StaffRoleEnum.DRIVER];

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  beforePatch(value: Required<RouteUpdateInput>): RouteUpdateInput {
    return {
      ...value,
      dateTimeStart: format(utcToZonedTime(new Date(value.dateTimeStart), 'UTC'), DATE_TIME_FORMAT),
      dateTimeEnd: format(utcToZonedTime(new Date(value.dateTimeStart), 'UTC'), DATE_TIME_FORMAT),
    };
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      dateTimeStart: [null, [Validators.required]],
      dateTimeEnd: [null, [Validators.required]],
      driverAssignedId: [null, [Validators.required]],
      provideComment: [null, [Validators.max(500)]],
    });
  }
}

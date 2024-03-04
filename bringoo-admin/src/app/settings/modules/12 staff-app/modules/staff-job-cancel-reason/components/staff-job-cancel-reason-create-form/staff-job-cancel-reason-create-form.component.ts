import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { JobCancelReasonCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-staff-job-cancel-reason-create-form',
  templateUrl: './staff-job-cancel-reason-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffJobCancelReasonCreateFormComponent extends DynamicForm<JobCancelReasonCreateInput> {
  defaultFormValue: Partial<JobCancelReasonCreateInput> = {
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      isActive: [null],
      code: [null, [Validators.required]],
    });
  }
}

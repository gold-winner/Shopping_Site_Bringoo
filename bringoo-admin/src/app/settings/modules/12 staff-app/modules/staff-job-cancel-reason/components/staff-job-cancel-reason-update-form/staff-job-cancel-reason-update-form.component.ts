import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { JobCancelReasonUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-staff-job-cancel-reason-update-form',
  templateUrl: './staff-job-cancel-reason-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffJobCancelReasonUpdateFormComponent extends DynamicForm<JobCancelReasonUpdateInput> {
  defaultFormValue: Partial<JobCancelReasonUpdateInput> = {};

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, []],
      isActive: [null, []],
      code: [null, [Validators.required]],
    });
  }
}

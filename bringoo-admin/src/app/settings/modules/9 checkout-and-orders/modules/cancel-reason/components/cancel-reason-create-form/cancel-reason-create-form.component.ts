import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { OrderCancelReasonCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-cancel-reason-create-form',
  templateUrl: './cancel-reason-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelReasonCreateFormComponent extends DynamicForm<OrderCancelReasonCreateInput> {
  defaultFormValue: Partial<OrderCancelReasonCreateInput> = {
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, [Validators.required]],
      isActive: [null, []],
      code: [null, [Validators.required]],
    });
  }
}

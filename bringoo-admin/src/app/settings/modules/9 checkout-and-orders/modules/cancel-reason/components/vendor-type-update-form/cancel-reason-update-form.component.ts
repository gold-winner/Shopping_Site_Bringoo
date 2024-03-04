import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { OrderCancelReasonUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-cancel-reason-update-form',
  templateUrl: './cancel-reason-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelReasonUpdateFormComponent extends DynamicForm<OrderCancelReasonUpdateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
    });
  }
}

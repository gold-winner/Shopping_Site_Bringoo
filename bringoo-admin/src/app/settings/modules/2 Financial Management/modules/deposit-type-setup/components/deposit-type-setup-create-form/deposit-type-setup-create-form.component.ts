import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { DepositTypeCreateInput, VatCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-deposit-type-setup-create-form',
  templateUrl: './deposit-type-setup-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositTypeSetupCreateFormComponent extends DynamicForm<DepositTypeCreateInput> {
  defaultFormValue: Partial<VatCreateInput> = {
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, []],
      isActive: [null, [Validators.required]],
    });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { LoyaltyProgramCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-management-setup-create-form',
  templateUrl: './loyalty-program-setup-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoyaltyProgramSetupCreateFormComponent extends DynamicForm<LoyaltyProgramCreateInput> {
  defaultFormValue: Partial<LoyaltyProgramCreateInput> = {
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
      logoUrl: [null, [Validators.required]],
    });
  }
}

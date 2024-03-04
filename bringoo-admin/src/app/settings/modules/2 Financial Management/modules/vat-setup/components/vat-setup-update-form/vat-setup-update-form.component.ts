import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { VatUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-vat-setup-update-form',
  templateUrl: './vat-setup-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VatSetupUpdateFormComponent extends DynamicForm<VatUpdateInput> {
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
      value: [null, [Validators.required]],
    });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CurrencyCodeEnum, VendorTypeUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-vendor-type-create-form',
  templateUrl: './vendor-type-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorTypeUpdateFormComponent extends DynamicForm<VendorTypeUpdateInput> {
  codeList = Object.keys(CurrencyCodeEnum);

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, []],
      isActive: [null, []],
    });
  }
}

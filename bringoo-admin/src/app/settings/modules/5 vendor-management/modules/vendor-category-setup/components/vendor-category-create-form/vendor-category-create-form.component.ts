import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CurrencyCreateInput, VendorCategoryCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-vendor-category-create-form',
  templateUrl: './vendor-category-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorCategoryCreateFormComponent extends DynamicForm<VendorCategoryCreateInput> {
  defaultFormValue: Partial<CurrencyCreateInput> = {
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
      description_i18n: [null],
      isActive: [null],
    });
  }
}

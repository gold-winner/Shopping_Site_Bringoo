import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { VendorCategoryUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-vendor-category-create-form',
  templateUrl: './vendor-category-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorCategoryUpdateFormComponent extends DynamicForm<VendorCategoryUpdateInput> {
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

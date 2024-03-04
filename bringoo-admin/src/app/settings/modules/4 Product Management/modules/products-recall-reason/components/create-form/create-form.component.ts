import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ProductRecallReasonCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-recall-reason-create-form',
  templateUrl: './create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecallReasonCreateFormComponent extends DynamicForm<ProductRecallReasonCreateInput> {
  defaultFormValue: Partial<ProductRecallReasonCreateInput> = {
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      isActive: [true, [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
    });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ProductRecallReasonUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-recall-reason-create-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecallReasonUpdateFormComponent extends DynamicForm<ProductRecallReasonUpdateInput> {
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

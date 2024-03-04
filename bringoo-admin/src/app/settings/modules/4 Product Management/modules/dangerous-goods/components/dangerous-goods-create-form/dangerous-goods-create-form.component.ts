import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ProductCategoryCreateInput, ProductDangerousGoodsCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-dangerous-goods-create-form',
  templateUrl: './dangerous-goods-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DangerousGoodsCreateFormComponent extends DynamicForm<ProductDangerousGoodsCreateInput> {
  defaultFormValue: Partial<ProductCategoryCreateInput> = { isActive: true };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      code: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
    });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ProductUnitCodeEnum, ProductUnitUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-unit-update-form',
  templateUrl: './product-unit-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductUnitUpdateFormComponent extends DynamicForm<ProductUnitUpdateInput> {
  productCodeList = Object.keys(ProductUnitCodeEnum);

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, []],
      isActive: [null, [Validators.required]],
      code: [null, [Validators.required]],
    });
  }
}

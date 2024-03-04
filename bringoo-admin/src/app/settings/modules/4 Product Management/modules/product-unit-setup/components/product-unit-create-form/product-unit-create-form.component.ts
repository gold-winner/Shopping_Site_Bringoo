import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ProductUnitCodeEnum, ProductUnitCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-unit-create-form',
  templateUrl: './product-unit-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductUnitCreateFormComponent extends DynamicForm<ProductUnitCreateInput> {
  productCodeList = Object.keys(ProductUnitCodeEnum);

  defaultFormValue: Partial<ProductUnitCreateInput> = {
    isActive: true,
  };

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

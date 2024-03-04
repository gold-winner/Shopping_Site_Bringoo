import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ProductCategoryUpdateInput, ProductDangerousGoodsUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-dangerous-goods-update-form',
  templateUrl: './dangerous-goods-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DangerousGoodsUpdateFormComponent extends DynamicForm<ProductDangerousGoodsUpdateInput> {
  defaultFormValue: Partial<ProductCategoryUpdateInput> = {};

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

  beforeSubmit(value: ProductCategoryUpdateInput): ProductCategoryUpdateInput {
    let ind: keyof typeof value;
    for (ind in value) {
      if (value[ind] === null || !this.form.get(ind)?.dirty) delete value[ind];
    }
    return value;
  }
}

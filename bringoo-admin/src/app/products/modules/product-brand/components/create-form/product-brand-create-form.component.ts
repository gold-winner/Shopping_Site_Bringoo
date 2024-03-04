import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ProductBrandCreateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-brand-create-form',
  templateUrl: './product-brand-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBrandCreateFormComponent extends DynamicForm<ProductBrandCreateInput> implements OnInit {
  defaultFormValue: Partial<ProductBrandCreateInput> = {
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      isActive: [true],
      name_i18n: [null, [Validators.required]],
      imageUrl: [null],
      watermarkImageUrl: [null],
      description_i18n: [null],
    });
  }
}

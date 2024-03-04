import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ProductLinkCartLimitUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-product-link-cart-limit-update-form',
  templateUrl: './store-product-link-cart-limit-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkCartLimitUpdateFormComponent extends DynamicForm<ProductLinkCartLimitUpdateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      productLinkId: [null, [Validators.required]],
      startDateTime: [null, [Validators.required]],
      endDateTime: [null, [Validators.required]],
      cartMaxAmount: [null, [Validators.required]],
    });
  }
}

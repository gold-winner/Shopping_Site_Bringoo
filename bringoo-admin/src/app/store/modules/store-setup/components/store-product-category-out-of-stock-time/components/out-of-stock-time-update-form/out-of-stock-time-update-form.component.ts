import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StoreProductCategoryOutOfStockTimeUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-product-category-out-of-stock-time-update-form',
  templateUrl: './out-of-stock-time-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductCategoryOutOfStockTimeUpdateFormComponent extends DynamicForm<StoreProductCategoryOutOfStockTimeUpdateInput> {
  defaultFormValue: Partial<StoreProductCategoryOutOfStockTimeUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
  };

  productLinkInfos: Record<string, string>[] = [];

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      productCategoryCode: [null, [Validators.required]],
      productOutOfStockTime: [null, [Validators.required]],
    });
  }
}

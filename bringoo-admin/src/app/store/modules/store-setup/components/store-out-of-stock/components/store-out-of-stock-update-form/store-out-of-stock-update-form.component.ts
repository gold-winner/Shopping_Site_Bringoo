import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { OutOfStockUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { requiredIfValidator } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-out-of-stock-update-form',
  templateUrl: './store-out-of-stock-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOutOfStockUpdateFormComponent extends DynamicForm<OutOfStockUpdateInput> {
  defaultFormValue: Partial<OutOfStockUpdateInput> = {
    isOutOfStock: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      productLinkId: [null, [Validators.required]],
      isOutOfStock: [null, []],
      startDateTime: [null, [Validators.required]],
      endDateTime: [null, requiredIfValidator(() => !!this.form.get('isOutOfStock')?.value)],
      comment: [null, []],
    });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CommissionFeeScaleEnum, CommissionFeeStoreUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-commission-fee-category-update-form',
  templateUrl: './store-commission-fee-category-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeCategoryUpdateFormComponent extends DynamicForm<CommissionFeeStoreUpdateInput> {
  defaultFormValue: Partial<CommissionFeeStoreUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'],
    commissionFeeScale: CommissionFeeScaleEnum.CATEGORY,
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      commissionFeeScale: [null, [Validators.required]],
      percent: [null, [Validators.required]],
      min: [null, [Validators.required]],
      max: [null, [Validators.required]],
      productCategoryCode: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
    });
  }
}

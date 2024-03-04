import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';

import { CommissionFeeScaleEnum, CommissionFeeStoreCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-commission-fee-category-create-form',
  templateUrl: './store-commission-fee-category-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeCategoryCreateFormComponent extends DynamicForm<CommissionFeeStoreCreateInput> {
  defaultFormValue: Partial<CommissionFeeStoreCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'],
    commissionFeeScale: CommissionFeeScaleEnum.CATEGORY,
    dateStart: format(new Date(), DATE_FORMAT),
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

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DayOfWeekEnum, StoreDeliverySlotUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { RemoveNotDirtyValues } from '../../../../../../../../shared/helpers/remove-not-dirty-values';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-delivery-slot-update-form',
  templateUrl: './store-delivery-slot-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDeliverySlotUpdateFormComponent extends DynamicForm<StoreDeliverySlotUpdateInput> {
  defaultFormValue: Partial<StoreDeliverySlotUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    daysOfWeek: [],
  };

  daysOfWeek: string[] = Object.keys(DayOfWeekEnum);

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      timeStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      timeEnd: [null, [Validators.required]],
      daysOfWeek: [[], [Validators.required]],
      slotDuration: [null, [Validators.required]],
      slotCapacity: [null, [Validators.required]],
    });
  }

  beforeSubmit(value: StoreDeliverySlotUpdateInput): StoreDeliverySlotUpdateInput {
    return RemoveNotDirtyValues(value, this.form);
  }
}

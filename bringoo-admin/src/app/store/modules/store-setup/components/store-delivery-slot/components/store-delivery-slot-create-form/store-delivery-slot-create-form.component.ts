import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format } from 'date-fns';

import { DayOfWeekEnum, StoreDeliverySlotCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-delivery-slot-create-form',
  templateUrl: './store-delivery-slot-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDeliverySlotCreateFormComponent extends DynamicForm<StoreDeliverySlotCreateInput> {
  defaultFormValue: Partial<StoreDeliverySlotCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    slotDuration: 60,
    slotCapacity: 5,
    daysOfWeek: [DayOfWeekEnum.MON, DayOfWeekEnum.TUE, DayOfWeekEnum.WED, DayOfWeekEnum.THU, DayOfWeekEnum.FRI],
    dateStart: format(new Date(), DATE_FORMAT),
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
      daysOfWeek: [this.defaultFormValue.daysOfWeek, [Validators.required]],
      slotDuration: [this.defaultFormValue.slotDuration, [Validators.required]],
      slotCapacity: [this.defaultFormValue.slotCapacity, [Validators.required]],
    });
  }

  beforeShow(): void {
    this.form.patchValue(this.defaultFormValue);
  }
}

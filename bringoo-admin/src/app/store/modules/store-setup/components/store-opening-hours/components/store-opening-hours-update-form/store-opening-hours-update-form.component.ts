import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  DayOfWeekEnum,
  StoreDeliverySlotUpdateInput,
  StoreOpeningHourUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { RemoveNotDirtyValues } from '../../../../../../../../shared/helpers/remove-not-dirty-values';
import { validationTime } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-opening-hours-update-form',
  templateUrl: './store-opening-hours-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOpeningHoursUpdateFormComponent extends DynamicForm<StoreOpeningHourUpdateInput> {
  defaultFormValue: Partial<StoreOpeningHourUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
  };

  listOfWeek: string[] = Object.keys(DayOfWeekEnum);

  beforePatch(value: StoreOpeningHourUpdateInput): StoreOpeningHourUpdateInput {
    const patchValue: StoreOpeningHourUpdateInput & any = value;
    if (value.daysOfWeek) {
      this.daysOfWeek = [...value.daysOfWeek];
    }
    return {
      ...patchValue,
    };
  }

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  daysOfWeek: string[] = [];

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      timeStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      timeEnd: [null, [Validators.required, validationTime(() => this.form.get('timeStart')?.value)]],
      daysOfWeek: [[]],
    });
  }

  onDaysOfWeek(v: string[]): void {
    this.form.patchValue({ daysOfWeek: v });
  }

  beforeSubmit(value: StoreDeliverySlotUpdateInput): StoreDeliverySlotUpdateInput {
    return RemoveNotDirtyValues(value, this.form);
  }
}

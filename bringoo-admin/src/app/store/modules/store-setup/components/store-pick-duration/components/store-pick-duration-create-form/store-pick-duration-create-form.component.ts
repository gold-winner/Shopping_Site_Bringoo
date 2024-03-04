import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format } from 'date-fns';

import { DayOfWeekEnum, StorePickDurationCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { requiredIfValidator, validationTime } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-pick-duration-create-form',
  templateUrl: './store-pick-duration-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorePickDurationCreateFormComponent extends DynamicForm<StorePickDurationCreateInput> {
  defaultFormValue: Partial<StorePickDurationCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    dateStart: format(new Date(), DATE_FORMAT),
    isUsePickDurationTimeRange: false,
  };

  listOfWeek: string[] = Object.keys(DayOfWeekEnum);

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
      timeEnd: [null, [Validators.required, validationTime(() => this.form.get('timeStart')?.value)]],
      daysOfWeek: [[]],
      pickDurationCapacity: [null, [Validators.required]],
      isUsePickDurationTimeRange: [null, [Validators.required]],
      pickDurationTimeStart: [null, requiredIfValidator(() => this.form.get('isUsePickDurationTimeRange')?.value)],
      pickDurationTimeEnd: [
        null,
        [
          requiredIfValidator(() => this.form.get('isUsePickDurationTimeRange')?.value),
          validationTime(() => this.form.get('pickDurationTimeStart')?.value),
        ],
      ],
    });
  }

  onDaysOfWeek(v: string[]): void {
    this.form.patchValue({ daysOfWeek: v });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DayOfWeekEnum, StorePickDurationUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { requiredIfValidator, validationTime } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-pick-duration-update-form',
  templateUrl: './store-pick-duration-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorePickDurationUpdateFormComponent extends DynamicForm<StorePickDurationUpdateInput> {
  defaultFormValue: Partial<StorePickDurationUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
  };

  listOfWeek: string[] = Object.keys(DayOfWeekEnum);

  beforePatch(value: StorePickDurationUpdateInput): StorePickDurationUpdateInput {
    const patchValue: StorePickDurationUpdateInput & any = value;
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

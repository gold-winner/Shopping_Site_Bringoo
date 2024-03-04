import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format } from 'date-fns';

import { DayOfWeekEnum, StoreOpeningHourCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { validationTime } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-opening-hours-create-form',
  templateUrl: './store-opening-hours-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOpeningHoursCreateFormComponent extends DynamicForm<StoreOpeningHourCreateInput> {
  defaultFormValue: Partial<StoreOpeningHourCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    dateStart: format(new Date(), DATE_FORMAT),
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
    });
  }

  onDaysOfWeek(v: string[]): void {
    this.form.patchValue({ daysOfWeek: v });
  }
}

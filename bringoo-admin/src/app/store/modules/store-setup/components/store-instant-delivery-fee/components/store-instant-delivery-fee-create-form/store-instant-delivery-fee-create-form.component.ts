import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { differenceInCalendarDays, format } from 'date-fns';
import { tap } from 'rxjs/operators';

import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import { StoreInstantDeliveryFeeCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { validationTime } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-delivery-fee-create-form',
  templateUrl: './store-instant-delivery-fee-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreInstantDeliveryFeeCreateFormComponent extends DynamicForm<StoreInstantDeliveryFeeCreateInput> {
  defaultFormValue: Partial<StoreInstantDeliveryFeeCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    dateStart: format(new Date(), DATE_FORMAT),
  };

  defaultTime = new Date(0, 0, 0, 0, 0, 0);

  today = new Date();
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  zipCodesList: string[] = [];

  dateRange: UntypedFormControl = new UntypedFormControl(null, [Validators.required, Validators.minLength(2)]);

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute, private crudStoreService: CrudStoreService) {
    super();
    this.buildForm();
    crudStoreService
      .getZoneZipCodes(this.route.parent?.parent?.snapshot.params['id'])
      .pipe(
        untilDestroyed(this),
        tap((v: string[]) => (this.zipCodesList = [...v])),
      )
      .subscribe();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      zipCodes: [null, [Validators.required]],
      timeStart: [null, [Validators.required]],
      timeEnd: [null, [Validators.required, validationTime(() => this.form.get('timeStart')?.value)]],
      fee: [null, [Validators.required]],
    });

    this.dateRange.valueChanges
      .pipe(
        untilDestroyed(this),
        tap((dates: Date[]) => {
          const patch: { dateStart: string | null; dateEnd: string | null } =
            dates.length > 0
              ? { dateStart: format(dates[0], DATE_FORMAT), dateEnd: format(dates[1], DATE_FORMAT) }
              : { dateStart: null, dateEnd: null };
          this.form.patchValue(patch);
        }),
      )
      .subscribe();
  }
}

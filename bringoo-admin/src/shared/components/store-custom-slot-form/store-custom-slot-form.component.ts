import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DayOfWeekEnum, OrderEntity, SlotReservationEntity, StoreCustomDeliverySlotInput } from '../../api/auth/data-contracts';
import { StoreSchedulerService } from '../../api/auth/store-scheduler.service';
import { DynamicForm } from '../../modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-custom-slot-form',
  templateUrl: './store-custom-slot-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCustomSlotForm extends DynamicForm<StoreCustomDeliverySlotInput> {
  pageSizeOptions: number[] = [10, 20, 30, 50];
  isLoading$: Observable<boolean> = this.service.isLoading$;
  defaultFormValue: Partial<StoreCustomDeliverySlotInput> = {
    storeId: this.route.snapshot.queryParams['storeId'] ?? this.route.parent?.parent?.snapshot.params['id'],
  };

  daysOfWeek: string[] = Object.keys(DayOfWeekEnum);
  tz: string = 'UTC';

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute, private readonly service: StoreSchedulerService) {
    super();
    this.buildForm();
  }

  onSetValue(value: any): any {
    if (value?.tz) {
      this.tz = value.tz;
    }
    return super.onSetValue(value);
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateTimeStart: [null, [Validators.required]],
      slotCapacity: [null, [Validators.required]],
      ts: [null],
      isActive: [null, [Validators.required]],
      orders: [],
      reservations: [],
    });
  }

  beforeShow(): void {
    this.form.patchValue(this.defaultFormValue);
  }

  onDeleteReservation(id: string): void {
    this.service
      .deleteReservation(id)
      .pipe(filter(Boolean))
      .subscribe(() => {
        const reservations: SlotReservationEntity[] = this.form
          .get('reservations')
          ?.value?.filter((res: SlotReservationEntity) => res.id !== id);
        this.form.patchValue({ reservations });
      });
  }

  get reservations(): SlotReservationEntity[] {
    return this.form.get('reservations')?.value;
  }

  get orders(): OrderEntity[] {
    return this.form.get('orders')?.value;
  }
}

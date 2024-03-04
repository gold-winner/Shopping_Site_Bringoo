import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { add, endOfWeek, format, startOfWeek, sub } from 'date-fns';
import { Observable } from 'rxjs';
import { filter, startWith, switchMap, take, tap } from 'rxjs/operators';

import { CrudStoreDeliverySlotService } from '../../../../../../../../shared/api/auth/crud-store-delivery-slot.service';
import {
  StoreCustomDeliverySlotInput,
  StoreSchedulerDto,
  TimeSlotDetailsDto,
  TimeSlotDto,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { StoreSchedulerService } from '../../../../../../../../shared/api/auth/store-scheduler.service';
import { StoreCustomSlotForm } from '../../../../../../../../shared/components/store-custom-slot-form/store-custom-slot-form.component';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { DynamicFormInputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';

@UntilDestroy()
@Component({
  selector: 'app-store-scheduler',
  templateUrl: './store-scheduler.component.html',
  styleUrls: ['./store-scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreSchedulerComponent {
  id: string = '';
  control: UntypedFormControl = new UntypedFormControl(new Date(), [Validators.required]);
  scheduler: Observable<StoreSchedulerDto> | undefined;
  openPanel: boolean = false;
  isLoading$: Observable<boolean> = this.service.isLoading$;
  customSlotForm: Type<DynamicForm<StoreCustomDeliverySlotInput>> = StoreCustomSlotForm;

  selectedSlot: TimeSlotDto | undefined;

  customSlotFormInputs: DynamicFormInputs = {
    value: null,
  };

  gridStyles: Record<string, string> = {
    'grid-template-columns': '0.5fr repeat(7, 1fr)',
    'grid-template-rows': '0.5fr repeat(8, 1fr)',
  };

  createFormOutputs: DynamicFormOutputs = {
    formSubmit: (value: StoreCustomDeliverySlotInput): void => this.saveCustomSlot(value),
    formValueChanges: (value: StoreCustomDeliverySlotInput): void => alert(value),
  };

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    public readonly service: StoreSchedulerService,
    public readonly slotService: CrudStoreDeliverySlotService,
  ) {
    this.getStoreId();
    this.subscribeOnChanges();
  }

  private subscribeOnChanges(): void {
    this.scheduler = this.control.valueChanges.pipe(
      startWith(new Date()),
      filter<Date>(Boolean),
      switchMap((date: Date) => this.onDateChange(date)),
      tap(({ days, labels }: StoreSchedulerDto) => {
        this.gridStyles = {
          'grid-template-columns': `0.5fr repeat(${days.length}, 1fr)`,
          ...(labels.length > 0 ? { 'grid-template-rows': `48px repeat(${labels.length}, 50px)` } : { 'grid-template-rows': `48px` }),
        };
      }),
    );
  }

  private getStoreId(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  }

  private onDateChange(date: Date): Observable<StoreSchedulerDto> {
    const dateStart: string = format(startOfWeek(date, { weekStartsOn: 1 }), DATE_FORMAT);
    const dateEnd: string = format(endOfWeek(date, { weekStartsOn: 1 }), DATE_FORMAT);
    return this.service.getTimeSlots({ storeId: this.id, dateStart, dateEnd }).pipe(take(1));
  }

  private saveCustomSlot({ storeId, slotCapacity, isActive, dateTimeStart }: StoreCustomDeliverySlotInput): void {
    this.slotService.updateCustomSlot({ storeId, slotCapacity, isActive, dateTimeStart }).subscribe(() => {
      this.openPanel = false;
      this.control.patchValue(this.control.value, { emitEvent: true });
    });
  }

  onShowSlotDetails(slot: TimeSlotDto): void {
    this.selectedSlot = slot;
    this.openPanel = true;
    this.service.getTimeSlotDetails(this.id, slot.dateTimeStart).subscribe((dto: TimeSlotDetailsDto) => {
      this.customSlotFormInputs = {
        value: { ...dto, slotCapacity: dto.total, ts: slot.tz },
        submit: undefined,
        show: Symbol('true'),
      };
    });
  }

  onCloseDrawer(): void {
    this.openPanel = false;
  }

  onSaveButtonClick(): void {
    this.customSlotFormInputs = { submit: Symbol('update') };
  }

  onPrev(): void {
    const date: Date = sub(startOfWeek(this.control.value, { weekStartsOn: 1 }), { weeks: 1 });
    this.control.patchValue(date, { emitEvent: true });
  }

  onNext(): void {
    const date: Date = add(startOfWeek(this.control.value, { weekStartsOn: 1 }), { weeks: 1 });
    this.control.patchValue(date, { emitEvent: true });
  }
}

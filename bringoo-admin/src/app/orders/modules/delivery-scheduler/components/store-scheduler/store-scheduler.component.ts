import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { add, endOfWeek, format, startOfWeek, sub } from 'date-fns';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { CrudStoreDeliverySlotService } from '../../../../../../shared/api/auth/crud-store-delivery-slot.service';
import {
  Pageable,
  StoreCustomDeliverySlotInput,
  StoreEntity,
  StoreSchedulerDto,
  TimeSlotDetailsDto,
  TimeSlotDto,
} from '../../../../../../shared/api/auth/data-contracts';
import { StoreSchedulerService } from '../../../../../../shared/api/auth/store-scheduler.service';
import { StoreCustomSlotForm } from '../../../../../../shared/components/store-custom-slot-form/store-custom-slot-form.component';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { DynamicFormInputs } from '../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';

@UntilDestroy()
@Component({
  selector: 'app-store-scheduler',
  templateUrl: './store-scheduler.component.html',
  styleUrls: [
    '../../../../../store/modules/store-setup/components/store-scheduler/components/store-scheduler/store-scheduler.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block w-100p h-100p scroll-hidden' },
})
export class StoreSchedulerComponent implements OnInit {
  form: UntypedFormGroup = this.fb.group({
    date: [new Date(), [Validators.required]],
    storeId: [null, [Validators.required]],
  });

  scheduler$: Observable<StoreSchedulerDto> | undefined;
  gridStyles: Record<string, string> = {
    'grid-template-columns': '0.5fr repeat(7, 1fr)',
    'grid-template-rows': '0.5fr repeat(8, 1fr)',
  };

  openPanel: boolean = false;
  isLoading$: Observable<boolean> = this.service.isLoading$;
  customSlotForm: Type<DynamicForm<StoreCustomDeliverySlotInput>> = StoreCustomSlotForm;

  selectedSlot: TimeSlotDto | undefined;

  customSlotFormInputs: DynamicFormInputs = {
    value: null,
  };

  createFormOutputs: DynamicFormOutputs = {
    formSubmit: (value: StoreCustomDeliverySlotInput): void => this.saveCustomSlot(value),
    formValueChanges: (value: StoreCustomDeliverySlotInput): void => alert(value),
  };

  storeSelect: SelectOptions<StoreEntity> = {
    service: this.crudStoreService,
    fields: ['name_i18n', 'id'],
    sort: ['name_i18n,ASC'],
    valueKey: 'id',
    getLabel(item: StoreEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public readonly service: StoreSchedulerService,
    public readonly slotService: CrudStoreDeliverySlotService,
    private readonly crudStoreService: CrudStoreService,
  ) {
    this.subscribeOnChanges();
  }

  ngOnInit(): void {
    this.crudStoreService.find({ fields: 'id', limit: 1 }).subscribe(({ items }: Pageable & { items?: StoreEntity[] }) => {
      if (this.route.snapshot.queryParams.storeId) {
        this.loadQueryParams();
      } else {
        if (items) {
          this.form.patchValue({ storeId: items[0].id });
        }
      }
    });

    this.storeIdToQueryParams();
  }

  private loadQueryParams(): void {
    this.form.patchValue({
      ...this.form,
      ...(this.route.snapshot.queryParams.storeId && { storeId: this.route.snapshot.queryParams.storeId }),
    });
  }

  private storeIdToQueryParams(): void {
    this.form.valueChanges.subscribe(({ storeId }: any) =>
      this.router.navigate([], {
        queryParams: { storeId },
        replaceUrl: true,
      }),
    );
  }

  private subscribeOnChanges(): void {
    this.scheduler$ = this.form.valueChanges.pipe(
      filter<{ date: Date; storeId: string }>((value: { date: Date; storeId: string }) => !!value.storeId),
      switchMap((data: { date: Date; storeId: string }) => this.onDateChange(data)),
      tap(({ days, labels }: StoreSchedulerDto) => {
        this.gridStyles = {
          'grid-template-columns': `0.5fr repeat(${days.length}, 1fr)`,
          ...(labels.length > 0 ? { 'grid-template-rows': `48px repeat(${labels.length}, 50px)` } : { 'grid-template-rows': `48px` }),
        };
      }),
    );
  }

  private onDateChange({ date, storeId }: { date: Date; storeId: string }): Observable<StoreSchedulerDto> {
    const dateStart: string = format(startOfWeek(date, { weekStartsOn: 1 }), DATE_FORMAT);
    const dateEnd: string = format(endOfWeek(date, { weekStartsOn: 1 }), DATE_FORMAT);
    return this.service.getTimeSlots({ storeId, dateStart, dateEnd }).pipe(take(1));
  }

  private saveCustomSlot({ storeId, slotCapacity, isActive, dateTimeStart }: StoreCustomDeliverySlotInput): void {
    this.slotService
      .updateCustomSlot({ storeId, slotCapacity, isActive, dateTimeStart })
      .pipe(untilDestroyed(this), take(1))
      .subscribe(() => {
        this.openPanel = false;
        this.form.get('date')?.patchValue(this.form.get('date')?.value, { emitEvent: true });
      });
  }

  onShowSlotDetails(slot: TimeSlotDto): void {
    this.selectedSlot = slot;
    this.openPanel = true;
    this.service
      .getTimeSlotDetails(this.form.get('storeId')?.value, slot.dateTimeStart)
      .pipe(untilDestroyed(this))
      .subscribe((dto: TimeSlotDetailsDto) => {
        this.customSlotFormInputs = {
          value: { ...dto, slotCapacity: dto.total },
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
    const date: Date = sub(startOfWeek(this.form.get('date')?.value, { weekStartsOn: 1 }), { weeks: 1 });
    this.form.get('date')?.patchValue(date, { emitEvent: true });
  }

  onNext(): void {
    const date: Date = add(startOfWeek(this.form.get('date')?.value, { weekStartsOn: 1 }), { weeks: 1 });
    this.form.get('date')?.patchValue(date, { emitEvent: true });
  }
}

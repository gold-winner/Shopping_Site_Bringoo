import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzSelectModeType } from 'ng-zorro-antd/select/select.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { CrudOrderService } from '../../api/auth/crud-order.service';
import { FindInput, OrderEntity, OrderStatusEnum, Pageable } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '../../config/constants.config';
import { CondOperator } from '../../modules/crud/enums/cond-operator';
import { FilterSearch } from '../../types/crud-filters.types';
import { ToFormGroupType } from '../../types/to-form-group.type';

type FilterFormType = {
  storeId: string | null;
  deliveryDate: string | null;
  deliveryTimeStart: string | null;
  deliveryTimeEnd: string | null;
  orderStatus: OrderStatusEnum | null;
};

type FormGroupType = ToFormGroupType<FilterFormType>;

@UntilDestroy()
@Component({
  selector: 'app-order-select',
  templateUrl: 'order-select.component.html',
  host: { class: 'd-block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderSelectComponent),
      multi: true,
    },
  ],
})
export class OrderSelectComponent extends CustomControlComponent<string | string[]> implements OnInit {
  @Input() set deliveryStartDateTime(value: string | null) {
    if (value) {
      this.filterForm.patchValue({
        ...(value && { deliveryDate: value }),
        ...(value && { deliveryTimeStart: value }),
      });
    }
  }

  @Input() set deliveryEndDateTime(value: string | null) {
    if (value) {
      this.filterForm.patchValue({
        ...(value && { deliveryTimeEnd: value }),
      });
    }
  }

  @Input() storeId?: string;
  @Input() type: NzSelectModeType = 'default';
  @Input() expand: boolean = false;

  _hideFilters: Set<'Store' | 'Status' | 'Date' | 'Time'> = new Set();
  @Input() set hideFilters(names: ('Store' | 'Status' | 'Date' | 'Time')[]) {
    this._hideFilters = new Set<'Store' | 'Status' | 'Date' | 'Time'>(names);
  }

  @Input() customFilters: FilterSearch<OrderEntity> = {};

  dateFormat: string = DATE_TIME_FORMAT;
  timeFormat: string = TIME_FORMAT;
  filtersVisible: boolean = false;
  orderStatuses: string[] = Object.values(OrderStatusEnum);

  filterForm: FormGroup<FormGroupType> = new FormGroup<FormGroupType>({
    deliveryDate: new FormControl(null),
    deliveryTimeStart: new FormControl(null),
    deliveryTimeEnd: new FormControl(null),
    storeId: new FormControl(null),
    orderStatus: new FormControl(null),
  });

  searchChange$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  findSubject: BehaviorSubject<FindInput> = new BehaviorSubject<FindInput>({
    page: 1,
    limit: 50,
    join: ['store||name_i18n,logoUrl,timeZone', 'keyPoint||id'],
    fields: 'orderNumber,deliveryDateTimeTo,orderStatus',
  });

  isLoading$: Observable<boolean> = this.orderService.isLoading$;
  private pageCount: number = 10000;
  total: number = 0;

  orders$: BehaviorSubject<OrderEntity[]> = new BehaviorSubject<OrderEntity[]>([]);
  optionList: OrderEntity[] = [];

  constructor(protected readonly inj: Injector, private readonly orderService: CrudOrderService) {
    super(inj);
    this.searchSubscribe();
  }

  ngOnInit(): void {
    this.initFilterForm();
    this.initFindSubject();
    this.filterFormChangesSubscribe();

    super.ngOnInit();
  }

  initFilterForm(): void {
    this.filterForm.patchValue({
      ...(this.storeId && { storeId: this.storeId }),
    });
  }

  initFindSubject(): void {
    this.findSubject.next({
      ...this.findSubject.getValue(),
      s: JSON.stringify({ ...this.mapFilterFormValues(this.filterForm.value) }),
    });
  }

  onSearch(term: string): void {
    this.findSubject.next({
      ...this.findSubject.getValue(),
      s: JSON.stringify(this.mapFilterFormValues(this.filterForm.value, term)),
      page: 1,
    });
  }

  searchSubscribe(): void {
    this.findSubject
      .asObservable()
      .pipe(
        untilDestroyed(this),
        debounceTime(200),
        switchMap((query: FindInput) => this.orderService.find({ ...query })),
      )
      .subscribe((pageable: Pageable & { items?: OrderEntity[] }) => {
        this.pageCount = pageable.pageCount;
        this.total = pageable.total;
        if (pageable.items) {
          this.optionList = pageable.page === 1 ? pageable.items : [...this.optionList, ...pageable.items];
        }
      });
  }

  onSelectOpenChange(open: boolean): void {
    if (open) {
      this.findSubject.next({
        ...this.findSubject.getValue(),
        page: 1,
      });
    }
  }

  onScrollBottom(): void {
    const { page, ...query }: FindInput = this.findSubject.getValue();

    this.findSubject.next({
      ...query,
      page: (page ?? 0) + 1,
    });
  }

  filterFormChangesSubscribe(): void {
    this.filterForm.valueChanges.pipe(untilDestroyed(this)).subscribe((v: Partial<FilterFormType>) => {
      this.findSubject.next({
        ...this.findSubject.getValue(),
        s: JSON.stringify({
          ...this.mapFilterFormValues(v),
        }),
        page: 1,
      });
    });
  }

  mapFilterFormValues(v: Partial<FilterFormType>, search?: string): Record<string, any> {
    const $and: any[] = [];

    if (v.deliveryTimeStart) {
      $and.push({
        deliveryDateTimeTo: {
          $gte: v.deliveryTimeStart,
        },
      });
    }

    if (v.deliveryTimeEnd) {
      $and.push({
        deliveryDateTimeTo: {
          $lte: v.deliveryTimeEnd,
        },
      });
    }

    if (v.orderStatus) {
      $and.push({ orderStatus: v.orderStatus });
    }
    if (v.storeId) {
      $and.push({ storeId: v.storeId });
    }

    if (search) {
      $and.push({ orderNumber: { $contL: search } });
    }

    if (this.customFilters) {
      $and.push({ ...this.customFilters });
    }

    return {
      $and,
    };
  }

  writeValue(val: string | string[]): void {
    if ((this.type === 'multiple' || this.type === 'tags') && !Array.isArray(val)) {
      val = [val];
    }

    if (val === null || val?.length === 0) {
      this.control.reset();
    } else {
      this.loadSelectedValues(val);
    }
  }

  loadSelectedValues(value: string | string[]): void {
    const values: string[] = Array.isArray(value) ? value : [value];
    const loaded: Set<string> = new Set(this.optionList.map(({ orderNumber }: OrderEntity) => orderNumber).filter(Boolean) as string[]);

    if (values.every((v: string) => loaded.has(v))) {
      this.control.setValue(value);
      return;
    }

    const search: string = JSON.stringify({
      id: { [CondOperator.IN]: values },
    });

    this.orderService
      .find({
        s: search,
        limit: 10000,
        page: 1,
        join: ['store||name_i18n,logoUrl,timeZone'],
        fields: 'orderNumber,deliveryDateTimeTo,orderStatus',
      })
      .subscribe((pageable: Pageable & { items?: OrderEntity[] }) => {
        if (!pageable || !pageable.items?.length) {
          return;
        } else {
          this.pageCount = pageable.pageCount;
          this.total = pageable.total;
          this.optionList = [...pageable.items];
          this.control.setValue(value);
        }
      });
  }
}

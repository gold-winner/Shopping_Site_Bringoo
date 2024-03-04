import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { add, format } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { AnalyticsCustomersService } from '../../../../../../../../shared/api/auth/analytics-customers.service';
import { CrudCustomerService } from '../../../../../../../../shared/api/auth/crud-customer.service';
import {
  BarChartValueDto,
  CustomerRoleEnum,
  CustomersOrderCountDto,
  GroupByDateEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { CohortGridEnum } from '../../../../../../../../shared/enums/cohort-grid.enum';
import { CustomersOrdersFiltersType } from '../../../../../../../../shared/types/customers-orders-filters.type';

@UntilDestroy()
@Component({
  selector: 'app-customers-orders-page',
  templateUrl: 'customers-orders-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersOrdersPageComponent implements OnInit {
  dateFormat: string = DATE_FORMAT;
  dateEnd: Date = add(new Date(), { days: 7 });
  dateStart: Date = add(this.dateEnd, { months: -12 });
  rolesList: string[] = Object.keys(CustomerRoleEnum);

  formatDateStart: string = format(this.dateStart, DATE_FORMAT);
  formatDateEnd: string = format(this.dateEnd, DATE_FORMAT);

  isLoaded$: Observable<boolean> = this.service.isLoading$.pipe(map((status: boolean) => !status));

  updateFilters: BehaviorSubject<CustomersOrdersFiltersType | null> = new BehaviorSubject<CustomersOrdersFiltersType | null>(null);
  customersOrdersCount$: Observable<CustomersOrderCountDto[]> = this.updateFilters.asObservable().pipe(
    switchMap(
      (): Observable<CustomersOrderCountDto[]> => {
        const { tags, role, dateStart, dateEnd }: CustomersOrdersFiltersType = this.form.value;
        return this.service.customersOrderCount({
          dateStart: dateStart ?? this.formatDateStart,
          dateEnd: dateEnd ?? this.formatDateEnd,
          ...(tags && { tags: Array.isArray(tags) ? tags : [tags] }),
          ...(role && { role }),
        });
      },
    ),
  );

  customersOverTime$: Observable<BarChartValueDto[]> = this.updateFilters.asObservable().pipe(
    switchMap(
      (): Observable<BarChartValueDto[]> => {
        const { role, tags, dateStart, dateEnd }: CustomersOrdersFiltersType = this.form.value;
        return this.service.customersOverTime({
          dateStart: dateStart ?? this.formatDateStart,
          dateEnd: dateEnd ?? this.formatDateEnd,
          groupBy: GroupByDateEnum.MONTH,
          ...(tags && { tags: Array.isArray(tags) ? tags : [tags] }),
          ...(role && { role }),
        });
      },
    ),
  );

  form!: UntypedFormGroup;

  constructor(
    private readonly service: AnalyticsCustomersService,
    private readonly fb: UntypedFormBuilder,
    private readonly crudCustomerService: CrudCustomerService,
  ) {}

  ngOnInit(): void {
    this.formBuild();
    this.loadInitData();
    this.subscribeFormChanges();
  }

  formBuild(): void {
    this.form = this.fb.group({
      role: [CustomerRoleEnum.CUSTOMER],
      tags: [[]],
      gridType: [CohortGridEnum.ORDERS_COUNT],
      dateStart: [format(this.dateStart, DATE_FORMAT)],
      dateEnd: [format(this.dateEnd, DATE_FORMAT)],
    });
  }

  loadInitData(): void {
    this.updateFilters.next(this.form.value);
  }

  subscribeFormChanges(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this), debounceTime(200), distinctUntilChanged())
      .subscribe((filters: CustomersOrdersFiltersType) => this.updateFilters.next(filters));
  }
}

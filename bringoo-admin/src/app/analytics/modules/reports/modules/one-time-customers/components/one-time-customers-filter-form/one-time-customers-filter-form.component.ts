import { ChangeDetectionStrategy, Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format } from 'date-fns';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { OneTimeCustomerInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DEFAULT_CURRENCY_SYMBOL } from '../../../../../../../../shared/const/default-currency-symbol.const';
import { getDayMonthAgo } from '../../../../../../../../shared/helpers/day-month-ago';

@UntilDestroy()
@Component({
  selector: 'app-one-time-customers-filter-form',
  templateUrl: './one-time-customers-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneTimeCustomersFilterFormComponent implements OnInit {
  @Output() salesFilter: EventEmitter<OneTimeCustomerInput> = new EventEmitter<OneTimeCustomerInput>();
  form!: UntypedFormGroup;

  dateStart: Date = getDayMonthAgo(new Date());
  dateEnd: Date = new Date();

  dateFormat: string = DATE_FORMAT;
  dateTimeFormat: string = DATE_TIME_FORMAT;
  defaultCurrency: string = DEFAULT_CURRENCY_SYMBOL;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getQuery();
  }

  buildForm(): void {
    this.form = this.fb.group({
      search: [null],
      storeId: [null],
      dateStart: [null],
      dateEnd: [null],
      itemsPurchased: [null],
      itemsPurchasedOrder: ['eq'],
      totalRevenue: [null],
      totalRevenueOrder: ['eq'],
    });

    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500),
        tap((filters: OneTimeCustomerInput & { itemsPurchasedOrder: string; totalRevenueOrder: string }) =>
          this.ngZone.run(() => this.router.navigate([], { queryParams: filters, replaceUrl: true })),
        ),
        map(
          ({
            search,
            storeId,
            dateEnd,
            dateStart,
            totalRevenue,
            totalRevenueOrder,
            itemsPurchased,
            itemsPurchasedOrder,
          }: OneTimeCustomerInput & { itemsPurchasedOrder: string; totalRevenueOrder: string }): OneTimeCustomerInput => {
            return {
              dateEnd,
              dateStart,
              ...(search && { search }),
              ...(storeId && { storeId }),
              ...(totalRevenue && { totalRevenue: `${totalRevenueOrder} ${totalRevenue}` }),
              ...(itemsPurchased && { itemsPurchased: `${itemsPurchasedOrder} ${itemsPurchased}` }),
            } as OneTimeCustomerInput;
          },
        ),
      )
      .subscribe((filters: OneTimeCustomerInput) => {
        this.salesFilter.emit(filters);
      });
  }

  protected getQuery(): void {
    if (Object.keys(this.route.snapshot.queryParams).length > 0) {
      this.form.patchValue({ ...this.route.snapshot.queryParams });
    } else {
      this.form.patchValue({ dateStart: format(this.dateStart, this.dateFormat), dateEnd: format(this.dateEnd, this.dateFormat) });
    }
  }
}

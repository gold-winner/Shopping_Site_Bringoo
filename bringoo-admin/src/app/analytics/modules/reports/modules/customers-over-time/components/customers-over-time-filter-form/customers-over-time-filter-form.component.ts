import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format } from 'date-fns';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AnalyticsCustomersOveTimeInput, CustomerRoleEnum, GroupByDateEnum } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { getDayMonthAgo } from '../../../../../../../../shared/helpers/day-month-ago';

@UntilDestroy()
@Component({
  selector: 'app-customers-over-time-filter-form',
  templateUrl: './customers-over-time-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class CustomersOverTimeFilterFormComponent implements OnInit {
  @Output() salesFilter: EventEmitter<AnalyticsCustomersOveTimeInput> = new EventEmitter<AnalyticsCustomersOveTimeInput>();
  form!: UntypedFormGroup;

  dateStart: Date = getDayMonthAgo(new Date());
  dateEnd: Date = new Date();

  dateFormat: string = DATE_FORMAT;
  dateTimeFormat: string = DATE_TIME_FORMAT;

  ordered: string[] = Object.keys(GroupByDateEnum);
  roles: string[] = Object.keys(CustomerRoleEnum);

  constructor(private readonly fb: UntypedFormBuilder, private router: Router, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      dateStart: [],
      dateEnd: [],
      groupBy: [GroupByDateEnum.DAY],
      role: [null],
      tags: [[]],
      languageCode: [null],
    });

    this.form.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged(), debounceTime(500))
      .subscribe((filters: AnalyticsCustomersOveTimeInput) => {
        this.salesFilter.emit(filters);
        this.router.navigate([], { queryParams: filters, replaceUrl: true }).then();
      });

    this.form.patchValue({
      ...this.route.snapshot.queryParams,
      ...(!this.route.snapshot.queryParams.dateStart && { dateStart: format(this.dateStart, this.dateFormat) }),
      ...(!this.route.snapshot.queryParams.dateEnd && { dateEnd: format(this.dateEnd, this.dateFormat) }),
    });
  }
}

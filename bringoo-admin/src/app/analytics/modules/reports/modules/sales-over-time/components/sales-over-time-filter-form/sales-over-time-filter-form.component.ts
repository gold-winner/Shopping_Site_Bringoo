import { ChangeDetectionStrategy, Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format } from 'date-fns';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { GroupByDateEnum, SalesOverTimeInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { getDayMonthAgo } from '../../../../../../../../shared/helpers/day-month-ago';

@UntilDestroy()
@Component({
  selector: 'app-sales-over-time-filter-form',
  templateUrl: './sales-over-time-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class SalesOverTimeFilterFormComponent implements OnInit {
  @Output() salesFilter: EventEmitter<SalesOverTimeInput> = new EventEmitter<SalesOverTimeInput>();
  form!: UntypedFormGroup;

  dateStart: Date = getDayMonthAgo(new Date());
  dateEnd: Date = new Date();

  dateFormat: string = DATE_FORMAT;
  dateTimeFormat: string = DATE_TIME_FORMAT;

  ordered: string[] = Object.keys(GroupByDateEnum);

  constructor(
    private readonly fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      dateStart: [null],
      dateEnd: [null],
      groupBy: [GroupByDateEnum.DAY],
      storeId: [null],
      storeCorporateCode: [null],
      storeBrandCode: [null],
      storeRegionCode: [null],
      vendorCategoryCode: [null],
      vendorTypeCode: [null],
    });

    this.form.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged(), debounceTime(500))
      .subscribe((filters: SalesOverTimeInput) => {
        this.salesFilter.emit(filters);
        this.router.navigate([], { queryParams: filters, replaceUrl: true });
      });

    this.form.patchValue({
      ...this.route.snapshot.queryParams,
      dateStart: format(this.dateStart, this.dateFormat),
      dateEnd: format(this.dateEnd, this.dateFormat),
    });
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
  AnalyticsOpsTeamDashboardInput,
  OrderCategoryEnum,
  OrderJobStatusEnum,
  OrderJobTypeEnum,
  OrderStatusEnum,
} from '../../../../../../shared/api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-ops-team-dashboard-filter',
  templateUrl: 'ops-team-dashboard-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class OpsTeamDashboardFilterComponent implements OnInit {
  @Output() filters: EventEmitter<Omit<AnalyticsOpsTeamDashboardInput, 'page' | 'limit' | 'order' | 'orderField'>> = new EventEmitter<
    Omit<AnalyticsOpsTeamDashboardInput, 'page' | 'limit' | 'order' | 'orderField'>
  >();

  jobStatuses: string[] = Object.values(OrderJobStatusEnum);
  orderStatuses: string[] = Object.values(OrderStatusEnum);
  jobTypes: string[] = Object.values(OrderJobTypeEnum);
  orderType: string[] = Object.values(OrderCategoryEnum);

  form: FormGroup<any> = new FormGroup<any>({
    search: new FormControl(null),
    storeId: new FormControl(null),
    storeRegionCode: new FormControl(null),
    pickerJob: new FormControl(null),
    driverJob: new FormControl(null),
    orderStatuses: new FormControl(null),
    jobsAssigment: new FormControl(null),
    orderType: new FormControl(null),
  });

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((data: Omit<AnalyticsOpsTeamDashboardInput, 'page' | 'limit' | 'order' | 'orderField'>) => {
        let ind: keyof typeof data;
        for (ind in data) {
          if (data[ind] === null || !this.form.get(ind)?.dirty || (Array.isArray(data[ind]) && data[ind]?.length === 0)) delete data[ind];
        }
        this.filters.emit(data);
      });
  }
}

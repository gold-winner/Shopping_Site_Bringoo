import { NgModule } from '@angular/core';

import { ChartModule } from '../../../../../../shared/modules/charts/chart.module';
import { CustomersOverTimeComponent } from './components/customers-over-time/customers-over-time.component';
import { CustomersOverTimeFilterFormComponent } from './components/customers-over-time-filter-form/customers-over-time-filter-form.component';
import { ReportsRouterModule } from './customers-over-time.router.module';

@NgModule({
  declarations: [CustomersOverTimeComponent, CustomersOverTimeFilterFormComponent],
  imports: [ReportsRouterModule, ChartModule],
})
export class CustomersOverTimeModule {}

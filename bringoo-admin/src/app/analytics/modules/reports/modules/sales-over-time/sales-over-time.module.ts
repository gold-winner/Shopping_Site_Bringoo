import { NgModule } from '@angular/core';

import { ChartModule } from '../../../../../../shared/modules/charts/chart.module';
import { SalesOverTimeComponent } from './components/sales-over-time/sales-over-time.component';
import { SalesOverTimeFilterFormComponent } from './components/sales-over-time-filter-form/sales-over-time-filter-form.component';
import { ReportsRouterModule } from './sales-over-time.router.module';

@NgModule({
  declarations: [SalesOverTimeComponent, SalesOverTimeFilterFormComponent],
  imports: [ReportsRouterModule, ChartModule],
})
export class SalesOverTimeModule {}

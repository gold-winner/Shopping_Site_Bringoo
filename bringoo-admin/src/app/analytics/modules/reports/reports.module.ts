import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { ReportsFiltersComponent } from './components/filters/reports-filters.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsRouterModule } from './reports.router.module';

@NgModule({
  declarations: [ReportsComponent, ReportsFiltersComponent],
  imports: [SharedModule, ReportsRouterModule],
})
export class ReportsModule {}

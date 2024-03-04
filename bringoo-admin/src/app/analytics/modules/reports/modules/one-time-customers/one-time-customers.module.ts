import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../../shared/shared.module';
import { OneTimeCustomersComponent } from './components/one-time-customers/one-time-customers.component';
import { OneTimeCustomersFilterFormComponent } from './components/one-time-customers-filter-form/one-time-customers-filter-form.component';
import { ReportsRouterModule } from './one-time-customers.router.module';

@NgModule({
  declarations: [OneTimeCustomersComponent, OneTimeCustomersFilterFormComponent],
  imports: [SharedModule, ReportsRouterModule],
})
export class OneTimeCustomersModule {}

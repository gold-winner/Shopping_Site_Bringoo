import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../../shared/shared.module';
import { LoyalCustomersComponent } from './components/loyal-customers/loyal-customers.component';
import { LoyalCustomersFilterFormComponent } from './components/loyal-customers-filter-form/loyal-customers-filter-form.component';
import { LoyalCustomersRouterModule } from './loyal-customers.router.module';

@NgModule({
  declarations: [LoyalCustomersComponent, LoyalCustomersFilterFormComponent],
  imports: [SharedModule, LoyalCustomersRouterModule],
})
export class LoyalCustomersModule {}

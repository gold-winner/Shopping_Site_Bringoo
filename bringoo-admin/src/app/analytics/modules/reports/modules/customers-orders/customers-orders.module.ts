import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../../shared/shared.module';
import { components } from './components';
import { CustomersOrdersRouterModule } from './customers-orders.router.module';

@NgModule({
  declarations: [...components],
  imports: [CustomersOrdersRouterModule, SharedModule],
})
export class CustomersOrdersModule {}

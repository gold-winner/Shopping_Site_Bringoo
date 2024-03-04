import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { CheckoutAndOrdersRouterModule } from './checkout-and-orders-router.module';
import { components } from './components';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, CheckoutAndOrdersRouterModule],
})
export class CheckoutAndOrdersModule {}

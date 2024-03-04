import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../../shared/shared.module';
import { OrderPerStoreComponent } from './components/order-per-store/order-per-store.component';
import { OrderPerStoreRouterModule } from './order-per-store.router.module';

@NgModule({
  declarations: [OrderPerStoreComponent],
  imports: [SharedModule, OrderPerStoreRouterModule],
})
export class OrderPerStoreModule {}

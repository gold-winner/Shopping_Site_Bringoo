import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { FilterFormComponent } from '../analytics/modules/reports/modules/store-performance/component/store-orders/filter-form/filter-form.component';
import { OrdersCardPageComponent } from './components/orders-card-page/orders-card-page.component';
import { OrdersRouterModule } from './orders-router.module';

@NgModule({
  declarations: [OrdersCardPageComponent, FilterFormComponent],
  imports: [OrdersRouterModule, SharedModule],
})
export class OrdersModule {}

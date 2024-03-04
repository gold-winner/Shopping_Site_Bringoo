import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { DynamicIoModule } from 'ng-dynamic-component';

import { OrdersTableModule } from '../../../orders/modules/orders-table/orders-table.module';
import { components } from './components';
import { modules } from './modules';
import { RouterMapRouterModule } from './router-map-router.module';
import { LogisticKeyPointsService } from './services/logistic-key-points.service';
import { LogisticOrdersService } from './services/logistic-orders.service';
import { LogisticRoutesService } from './services/logistic-routes.service';
import { RoutePlanningService } from './services/route-planning.service';

@NgModule({
  exports: [],
  declarations: [...components],
  providers: [RoutePlanningService, LogisticOrdersService, LogisticRoutesService, LogisticKeyPointsService],
  imports: [RouterMapRouterModule, GoogleMapsModule, OrdersTableModule, DynamicIoModule, ...modules],
})
export class RouterMapModule {}

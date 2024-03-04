import { NgModule } from '@angular/core';

import { ChartModule } from '../../../../../../shared/modules/charts/chart.module';
import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreInformationComponent } from './component/store-information/store-information.component';
import { OrdersCrudComponent } from './component/store-orders/orders-crud/orders-crud.component';
import { StorePerformanceComponent } from './component/store-performance-page/store-performance.component';
import { StorePerformanceRouterModule } from './store-performance.router.module';

@NgModule({
  declarations: [StoreInformationComponent, StorePerformanceComponent, OrdersCrudComponent],
  imports: [SharedModule, StorePerformanceRouterModule, ChartModule, CrudModule],
})
export class StorePerformanceModule {}

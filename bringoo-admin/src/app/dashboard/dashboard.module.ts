import { NgModule } from '@angular/core';

import { ChartModule } from '../../shared/modules/charts/chart.module';
import { CrudModule } from '../../shared/modules/crud/crud.module';
import { SharedModule } from '../../shared/shared.module';
import { PushNotificationModule } from '../push-notification/push-notification.module';
import { dashboardComponents } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [...dashboardComponents],
  imports: [SharedModule, CrudModule, DashboardRoutingModule, ChartModule, PushNotificationModule],
})
export class DashboardModule {}

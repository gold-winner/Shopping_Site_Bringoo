import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerTasksComponent } from './manager-tasks/manager-tasks.component';
import { OrderForecastComponent } from './order-forecast/order-forecast.component';
import { OrdersByHourComponent } from './orders-by-hour/orders-by-hour.component';
import { ProfileComponent } from './profile/profile.component';

export const dashboardComponents: Required<NgModule>['declarations'] = [
  DashboardComponent,
  OrderForecastComponent,
  ProfileComponent,
  ManagerTasksComponent,
  OrdersByHourComponent,
];

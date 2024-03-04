import { NgModule } from '@angular/core';

import { BacklogOrdersComponent } from './backlog-orders/backlog-orders.component';
import { BacklogPageComponent } from './backlog-page/backlog-page.component';
import { BacklogPageFiltersComponent } from './backlog-page-filters/backlog-page-filters.component';
import { CreateKeyPointsListComponent } from './create-key-points-list/create-key-points-list.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { CreateRouteFormComponent } from './create-route-form/create-route-form.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { RouteComponent } from './route/route.component';
import { RouteKeyPointListComponent } from './route-key-point-list/route-key-point-list.component';
import { StaffAvatarsComponent } from './staff-avatars/staff-avatars.component';

export const components: Required<NgModule>['declarations'] = [
  BacklogPageComponent,
  BacklogOrdersComponent,
  CreateRouteComponent,
  OrdersListComponent,
  CreateRouteFormComponent,
  CreateKeyPointsListComponent,
  RouteComponent,
  RouteKeyPointListComponent,
  StaffAvatarsComponent,
  BacklogPageFiltersComponent,
];

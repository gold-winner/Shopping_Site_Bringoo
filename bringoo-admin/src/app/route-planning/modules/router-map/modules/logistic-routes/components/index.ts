import { NgModule } from '@angular/core';

import { CreateRouteFormComponent } from './create-route-form/create-route-form.component';
import { OrdersToRouteComponent } from './orders-to-route/orders-to-route.component';
import { RouteFilterFormComponent } from './route-filter-form/route-filter-form.component';
import { RouterItemComponent } from './router-item/router-item.component';
import { RoutersSideBarComponent } from './routers-side-bar/routers-side-bar.component';
import { RoutesDropZoneComponent } from './routes-drop-zone/routes-drop-zone.component';

export const components: Required<NgModule>['declarations'] = [
  RoutersSideBarComponent,
  RouterItemComponent,
  RouteFilterFormComponent,
  CreateRouteFormComponent,
  RoutesDropZoneComponent,
  OrdersToRouteComponent,
];

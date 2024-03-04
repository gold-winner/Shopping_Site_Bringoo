import { NgModule } from '@angular/core';

import { CreateRouteComponent } from './create-route/create-route.component';
import { OrderFiltersComponent } from './order-filters/order-filters.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrdersDropZoneComponent } from './orders-drop-zone/orders-drop-zone.component';
import { OrdersSideBarComponent } from './orders-side-bar/orders-side-bar.component';

export const components: Required<NgModule>['declarations'] = [
  OrderFiltersComponent,
  OrderItemComponent,
  OrdersSideBarComponent,
  OrdersDropZoneComponent,
  CreateRouteComponent,
];

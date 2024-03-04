import { NgModule } from '@angular/core';

import { KeyPointInfoWindowComponent } from './key-point-info-window/key-point-info-window.component';
import { OrderInfoWindowComponent } from './order-info-window/order-info-window.component';
import { RouteMapComponent } from './route-map/route-map.component';
import { StoreInfoWindowComponent } from './store-info-window/store-info-window.component';

export const components: Required<NgModule>['declarations'] = [
  RouteMapComponent,
  KeyPointInfoWindowComponent,
  OrderInfoWindowComponent,
  StoreInfoWindowComponent,
];

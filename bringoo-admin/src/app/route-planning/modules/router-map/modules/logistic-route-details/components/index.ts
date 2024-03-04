import { NgModule } from '@angular/core';

import { AssignDriverComponent } from './assign-driver/assign-driver.component';
import { CreateKeyPointComponent } from './create-key-point/create-key-point.component';
import { KeyPointComponent } from './key-point/key-point.component';
import { OrderDetailsFilterFormComponent } from './order-details-filter-form/order-details-filter-form.component';
import { RouteDetailsBarComponent } from './route-details-bar/route-details-bar.component';
import { RouteDetailsDropZoneComponent } from './route-details-drop-zone/route-details-drop-zone.component';
import { UpdateKeyPointComponent } from './update-key-point/update-key-point.component';
import { UpdateRouteComponent } from './update-route/update-route.component';

export const components: Required<NgModule>['declarations'] = [
  UpdateRouteComponent,
  UpdateKeyPointComponent,
  RouteDetailsBarComponent,
  OrderDetailsFilterFormComponent,
  KeyPointComponent,
  CreateKeyPointComponent,
  RouteDetailsDropZoneComponent,
  AssignDriverComponent,
];

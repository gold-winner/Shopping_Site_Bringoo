import { NgModule } from '@angular/core';

import { GetContainerIdsPipe } from './get-connections-containers.pipe';
import { HideKpByFiltersPipe } from './hide-kp-by-filters.pipe';
import { KeyPointInputPipe } from './key-point.pipe';
import { KeyPointTypeIconPipe } from './key-point-type-icon.pipe';
import { OrderPriorityPipe } from './order-priority.pipe';
import { OrderStatusIconPipe } from './order-status-icon.pipe';
import { OrderTagStatusPipe } from './order-tag-status.pipe';
import { OrderWithStaffInfoPipe } from './order-with-staff-info.pipe';

export const pipe: Required<NgModule>['declarations'] = [
  OrderStatusIconPipe,
  OrderTagStatusPipe,
  OrderWithStaffInfoPipe,
  KeyPointInputPipe,
  KeyPointTypeIconPipe,
  OrderPriorityPipe,
  GetContainerIdsPipe,
  HideKpByFiltersPipe,
];

import { NgModule } from '@angular/core';

import { ActionColumnWidthPipe } from './action-column-width.pipe';
import { EntityValuePipe } from './entity-value.pipe';
import { JoinPipe } from './join.pipe';

export const pipes: Required<NgModule>['declarations'] = [JoinPipe, EntityValuePipe, ActionColumnWidthPipe];

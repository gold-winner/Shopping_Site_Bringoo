import { NgModule } from '@angular/core';

import { ColumnDateComponent } from './column-date/column-date.component';
import { ColumnTagsComponent } from './column-tags/column-tags.component';
import { ColumnTimeComponent } from './column-time/column-time.component';

export const components: Required<NgModule>['declarations'] = [ColumnTimeComponent, ColumnDateComponent, ColumnTagsComponent];

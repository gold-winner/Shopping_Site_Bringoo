import { NgModule } from '@angular/core';

import { NationalityCreateComponent } from './nationality-create/nationality-create.component';
import { NationalityCrudComponent } from './nationality-crud/nationality-crud.component';
import { NationalityFilterComponent } from './nationality-filter/nationality-filter.component';
import { NationalityUpdateComponent } from './nationality-update/nationality-update.component';

export const components: Required<NgModule>['declarations'] = [
  NationalityCrudComponent,
  NationalityCreateComponent,
  NationalityUpdateComponent,
  NationalityFilterComponent,
];

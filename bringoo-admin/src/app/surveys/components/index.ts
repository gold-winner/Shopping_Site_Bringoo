import { NgModule } from '@angular/core';

import { CreateSurveysComponent } from './create-surveys/create-surveys.component';
import { CrudSurveysComponent } from './crud-surveys/crud-surveys.component';
import { FilterSurveysComponent } from './filter-surveys/filter-surveys.component';
import { UpdateSurveysComponent } from './update-surveys/update-surveys.component';

export const components: Required<NgModule>['declarations'] = [
  CrudSurveysComponent,
  CreateSurveysComponent,
  UpdateSurveysComponent,
  FilterSurveysComponent,
];

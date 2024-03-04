import { NgModule } from '@angular/core';

import { StoreConsultantsCreateFormComponent } from './store-consultants-create-form/store-consultants-create-form.component';
import { StoreConsultantsCrudComponent } from './store-consultants-crud/store-consultants-crud.component';
import { StoreConsultantsFilterFormComponent } from './store-consultants-filter-form/store-consultants-filter-form.component';
import { StoreConsultantsUpdateFormComponent } from './store-consultants-update-form/store-consultants-update-form.component';

export const components: Required<NgModule>['declarations'] = [
  StoreConsultantsCrudComponent,
  StoreConsultantsCreateFormComponent,
  StoreConsultantsUpdateFormComponent,
  StoreConsultantsFilterFormComponent,
];

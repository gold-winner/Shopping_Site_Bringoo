import { NgModule } from '@angular/core';

import { StoresCreateFormComponent } from './stores-create-form/stores-create-form.component';
import { StoresCrudComponent } from './stores-crud/stores-crud.component';
import { StoresFilterFormComponent } from './stores-filter-form/stores-filter-form.component';

export const components: Required<NgModule>['declarations'] = [StoresFilterFormComponent, StoresCrudComponent, StoresCreateFormComponent];

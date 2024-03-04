import { NgModule } from '@angular/core';

import { CohortGridComponent } from './cohort-grid/cohort-grid.component';
import { CustomersOrdersPageComponent } from './customers-orders-page/customers-orders-page.component';

export const components: Required<NgModule>['declarations'] = [CustomersOrdersPageComponent, CohortGridComponent];

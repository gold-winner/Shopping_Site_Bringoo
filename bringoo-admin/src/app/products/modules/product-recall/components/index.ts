import { NgModule } from '@angular/core';

import { ProductRecallCreateFormComponent } from './product-recall-create/product-recall-create-form.component';
import { ProductRecallCrudComponent } from './product-recall-crud/product-recall-crud.component';
import { ProductRecallDetailsComponent } from './product-recall-details/product-recall-details.component';
import { ProductRecallFilterFormComponent } from './product-recall-filter-form/product-recall-filter-form.component';
import { ProductRecallReportComponent } from './product-recall-report/product-recall-report.component';
import { ProductRecallUpdateFormComponent } from './product-recall-update/product-recall-update-form.component';

export const components: Required<NgModule>['declarations'] = [
  ProductRecallCrudComponent,
  ProductRecallCreateFormComponent,
  ProductRecallUpdateFormComponent,
  ProductRecallFilterFormComponent,
  ProductRecallDetailsComponent,
  ProductRecallReportComponent,
];

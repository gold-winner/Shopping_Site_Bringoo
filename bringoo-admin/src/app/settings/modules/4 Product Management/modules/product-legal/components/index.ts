import { NgModule } from '@angular/core';

import { ProductLegalCrudComponent } from './product-legal-crud/product-legal-crud.component';
import { ProductLegalFormCreateComponent } from './product-legal-form-create/product-legal-form-create.component';
import { ProductLegalFormFilterComponent } from './product-legal-form-filter/product-legal-form-filter.component';
import { ProductLegalFormUpdateComponent } from './product-legal-form-update/product-legal-form-update.component';

export const components: Required<NgModule>['declarations'] = [
  ProductLegalCrudComponent,
  ProductLegalFormFilterComponent,
  ProductLegalFormCreateComponent,
  ProductLegalFormUpdateComponent,
];

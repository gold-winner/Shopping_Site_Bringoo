import { NgModule } from '@angular/core';
import { NgxBarcode6Module } from 'ngx-barcode6';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductRequestCrudComponent } from './components/product-request-crud/product-request-crud.component';
import { ProdutRequestDetailComponent } from './components/product-request-detail/product-request-detail.component';
import { ProductRequestFilterFormComponent } from './components/product-request-filter-form/product-request-filter-form.component';
import { ProductRequestPropertyEditComponent } from './components/product-request-property-edit/product-request-property-edit.component';
import { ProductRequestRouterModule } from './product-request-router.module';

@NgModule({
  declarations: [
    ProductRequestCrudComponent,
    ProductRequestFilterFormComponent,
    ProdutRequestDetailComponent,
    ProductRequestPropertyEditComponent,
  ],
  imports: [SharedModule, CrudModule, ProductRequestRouterModule, NgxBarcode6Module],
})
export class ProductRequestModule {}

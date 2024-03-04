import { NgModule } from '@angular/core';
import { NgxBarcode6Module } from 'ngx-barcode6';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductDisclaimerModule } from '../../../store/modules/store-setup/components/product-disclaimer/product-disclaimer.module';
import { ProductAttributesModule } from '../product-attributes/product-attributes.module';
import { ProductDisclaimerComponent } from './components/product-disclaimer/product-disclaimer.component';
import { ProductsCreateFormComponent } from './components/products-create-form/products-create-form.component';
import { ProductsCrudComponent } from './components/products-crud/products-crud.component';
import { ProductsFilterFormComponent } from './components/products-filter-form/products-filter-form.component';
import { ProductsUpdateFormComponent } from './components/products-update-form/products-update-form.component';
import { ProductsUpdateManyFormComponent } from './components/products-update-many-form/products-update-many-form.component';
import { ProductsRouterModule } from './products-router.module';

@NgModule({
  declarations: [
    ProductsCreateFormComponent,
    ProductsCrudComponent,
    ProductsFilterFormComponent,
    ProductsUpdateFormComponent,
    ProductsUpdateManyFormComponent,
    ProductDisclaimerComponent,
  ],
  imports: [SharedModule, ProductAttributesModule, CrudModule, ProductsRouterModule, NgxBarcode6Module, ProductDisclaimerModule],
  exports: [ProductsUpdateFormComponent],
})
export class ProductsModule {}

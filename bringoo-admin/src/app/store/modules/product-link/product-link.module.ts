import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreProductLinkCrudComponent } from './components/store-product-link-crud/store-product-link-crud.component';
import { StoreProductLinkFilterFormComponent } from './components/store-product-link-filter-form/store-product-link-filter-form.component';
import { ProductLinkRouterModule } from './product-link-router.module';

@NgModule({
  declarations: [StoreProductLinkCrudComponent, StoreProductLinkFilterFormComponent],
  imports: [SharedModule, CrudModule, ProductLinkRouterModule],
})
export class ProductLinkModule {}

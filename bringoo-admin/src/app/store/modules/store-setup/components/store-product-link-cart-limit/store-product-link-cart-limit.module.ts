import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreProductLinkCartLimitCreateFormComponent } from './components/store-product-link-cart-limit-create-form/store-product-link-cart-limit-create-form.component';
import { StoreProductLinkCartLimitCrudComponent } from './components/store-product-link-cart-limit-crud/store-product-link-cart-limit-crud.component';
import { StoreProductLinkCartLimitFilterFormComponent } from './components/store-product-link-cart-limit-filter-form/store-product-link-cart-limit-filter-form.component';
import { StoreProductLinkCartLimitUpdateFormComponent } from './components/store-product-link-cart-limit-update-form/store-product-link-cart-limit-update-form.component';
import { StoreProductLinkCartLimitRoutingModule } from './store-product-link-cart-limit-routing.module';

@NgModule({
  declarations: [
    StoreProductLinkCartLimitCrudComponent,
    StoreProductLinkCartLimitCreateFormComponent,
    StoreProductLinkCartLimitUpdateFormComponent,
    StoreProductLinkCartLimitFilterFormComponent,
  ],
  imports: [StoreProductLinkCartLimitRoutingModule, SharedModule, CrudModule],
})
export class StoreProductLinkCartLimitModule {}

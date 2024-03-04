import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreProductLinkCartLimitCrudComponent } from './components/store-product-link-cart-limit-crud/store-product-link-cart-limit-crud.component';

const routes: Routes = [{ path: '', component: StoreProductLinkCartLimitCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreProductLinkCartLimitRoutingModule {}

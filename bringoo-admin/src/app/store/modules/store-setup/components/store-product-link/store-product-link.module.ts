import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreProductLinkCreateFormComponent } from './components/store-product-link-create-form/store-product-link-create-form.component';
import { StoreProductLinkCrudComponent } from './components/store-product-link-crud/store-product-link-crud.component';
import { StoreProductLinkFilterFormComponent } from './components/store-product-link-filter-form/store-product-link-filter-form.component';
import { StoreProductLinkRouterModule } from './store-product-link-router.module';

@NgModule({
  declarations: [StoreProductLinkCrudComponent, StoreProductLinkCreateFormComponent, StoreProductLinkFilterFormComponent],
  imports: [SharedModule, CrudModule, StoreProductLinkRouterModule],
  exports: [StoreProductLinkCreateFormComponent],
})
export class StoreProductLinkModule {}

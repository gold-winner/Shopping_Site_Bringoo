import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreProductCategoryAndGroupModule } from '../store-product-category-and-groups/store-product-category-and-group.module';
import { ProductCategorySortingComponent } from './components/product-category-sorting/product-category-sorting.component';
import { ProductCategorySortingRouterModule } from './product-category-sorting.router.module';

@NgModule({
  declarations: [ProductCategorySortingComponent],
  imports: [SharedModule, CrudModule, ProductCategorySortingRouterModule, StoreProductCategoryAndGroupModule],
})
export class ProductCategorySortingModule {}

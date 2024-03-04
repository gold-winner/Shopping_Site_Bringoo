import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCategoryAndGroupsComponent } from './components/store-product-category-and-groups/product-category-and-groups.component';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoryAndGroupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreProductCategoryAndGroupRouterModule {}

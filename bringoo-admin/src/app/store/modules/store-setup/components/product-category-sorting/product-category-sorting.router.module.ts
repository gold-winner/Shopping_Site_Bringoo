import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCategorySortingComponent } from './components/product-category-sorting/product-category-sorting.component';

const routes: Routes = [{ path: '', component: ProductCategorySortingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategorySortingRouterModule {}

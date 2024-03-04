import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { ProductsComponent } from './products.component';
const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'categories', component: ProductsGridComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

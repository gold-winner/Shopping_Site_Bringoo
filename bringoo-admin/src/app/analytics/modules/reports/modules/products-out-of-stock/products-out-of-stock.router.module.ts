import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsOutOfStockComponent } from './components/products-out-of-stock/products-out-of-stock.component';

const routes: Routes = [{ path: '', component: ProductsOutOfStockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRouterModule {}

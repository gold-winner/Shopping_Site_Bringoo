import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesProductsComponent } from './components/sales-products/sales-products.component';

const routes: Routes = [{ path: '', component: SalesProductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRouterModule {}

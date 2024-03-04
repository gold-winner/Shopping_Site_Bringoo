import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsRefundComponent } from './components/products-refund/products-refund.component';

const routes: Routes = [{ path: '', component: ProductsRefundComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRouterModule {}

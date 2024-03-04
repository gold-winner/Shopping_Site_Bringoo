import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreCommissionFeeProductCrudComponent } from './components/store-commission-fee-product-crud/store-commission-fee-product-crud.component';

const routes: Routes = [{ path: '', component: StoreCommissionFeeProductCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCommissionFeeProductRoutingModule {}

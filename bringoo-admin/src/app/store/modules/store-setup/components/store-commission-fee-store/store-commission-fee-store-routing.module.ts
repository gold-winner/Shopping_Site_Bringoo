import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreCommissionFeeStoreCrudComponent } from './components/store-commission-fee-store-crud/store-commission-fee-store-crud.component';

const routes: Routes = [{ path: '', component: StoreCommissionFeeStoreCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCommissionFeeStoreRoutingModule {}

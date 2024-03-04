import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreCommissionFeeSubcategoryCrudComponent } from './components/store-commission-fee-subcategory-crud/store-commission-fee-subcategory-crud.component';

const routes: Routes = [{ path: '', component: StoreCommissionFeeSubcategoryCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCommissionFeeSubcategoryRoutingModule {}

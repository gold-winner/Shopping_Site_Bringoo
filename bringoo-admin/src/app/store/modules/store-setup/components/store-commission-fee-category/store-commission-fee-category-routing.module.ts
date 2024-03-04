import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreCommissionFeeCategoryCrudComponent } from './components/store-commission-fee-category-crud/store-commission-fee-category-crud.component';

const routes: Routes = [{ path: '', component: StoreCommissionFeeCategoryCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCommissionFeeCategoryRoutingModule {}

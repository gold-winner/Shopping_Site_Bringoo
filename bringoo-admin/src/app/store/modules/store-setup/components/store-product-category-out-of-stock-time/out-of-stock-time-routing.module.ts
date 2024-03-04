import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreProductCategoryOutOfStockTimeCrudComponent } from './components/out-of-stock-time-crud/out-of-stock-time-crud.component';

const routes: Routes = [{ path: '', component: StoreProductCategoryOutOfStockTimeCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreProductCategoryOutOfStockTimeRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreOutOfStockCrudComponent } from './components/store-out-of-stock-crud/store-out-of-stock-crud.component';

const routes: Routes = [{ path: '', component: StoreOutOfStockCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutOfStockRoutingModule {}

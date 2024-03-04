import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderPerStoreComponent } from './components/order-per-store/order-per-store.component';

const routes: Routes = [{ path: '', component: OrderPerStoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPerStoreRouterModule {}

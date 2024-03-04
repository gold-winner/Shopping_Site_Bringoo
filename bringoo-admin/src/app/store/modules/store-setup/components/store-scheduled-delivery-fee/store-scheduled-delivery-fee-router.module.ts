import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreScheduledDeliveryFeeCrudComponent } from './components/store-scheduled-delivery-fee-crud/store-scheduled-delivery-fee-crud.component';

const routes: Routes = [{ path: '', component: StoreScheduledDeliveryFeeCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreScheduledDeliveryFeeRouterModule {}

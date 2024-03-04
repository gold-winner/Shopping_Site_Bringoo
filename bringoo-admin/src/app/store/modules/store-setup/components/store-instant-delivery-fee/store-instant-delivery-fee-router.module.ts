import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreInstantDeliveryFeeCrudComponent } from './components/store-instant-delivery-fee-crud/store-instant-delivery-fee-crud.component';

const routes: Routes = [{ path: '', component: StoreInstantDeliveryFeeCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreInstantDeliveryFeeRouterModule {}

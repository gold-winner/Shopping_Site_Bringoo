import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreDeliverySlotCrudComponent } from './components/store-delivery-slot-crud/store-delivery-slot-crud.component';

const routes: Routes = [{ path: '', component: StoreDeliverySlotCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDeliverySlotRouterModule {}

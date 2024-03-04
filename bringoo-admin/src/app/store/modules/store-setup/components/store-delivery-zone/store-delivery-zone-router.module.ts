import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreDeliveryZoneCrudComponent } from './components/store-delivery-zone-crud/store-delivery-zone-crud.component';

const routes: Routes = [{ path: '', component: StoreDeliveryZoneCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDeliveryZoneRouterModule {}

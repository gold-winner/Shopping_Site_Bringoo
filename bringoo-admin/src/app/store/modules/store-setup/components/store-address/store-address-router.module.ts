import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreAddressCrudComponent } from './components/store-address-crud/store-address-crud.component';

const routes: Routes = [{ path: '', component: StoreAddressCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreAddressRouterModule {}

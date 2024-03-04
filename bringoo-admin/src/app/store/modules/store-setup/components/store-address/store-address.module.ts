import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreAddressCreateFormComponent } from './components/store-address-create-form/store-address-create-form.component';
import { StoreAddressCrudComponent } from './components/store-address-crud/store-address-crud.component';
import { StoreAddressFilterFormComponent } from './components/store-address-filter-form/store-address-filter-form.component';
import { StoreAddressUpdateFormComponent } from './components/store-address-update-form/store-address-update-form.component';
import { StoreAddressRouterModule } from './store-address-router.module';

@NgModule({
  declarations: [
    StoreAddressCrudComponent,
    StoreAddressCreateFormComponent,
    StoreAddressUpdateFormComponent,
    StoreAddressFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreAddressRouterModule, GoogleMapsModule],
})
export class StoreAddressModule {}

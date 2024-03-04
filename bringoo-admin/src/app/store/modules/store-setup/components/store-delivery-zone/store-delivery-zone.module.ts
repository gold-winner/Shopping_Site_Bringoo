import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { GoogleMapsCustomComponentsModule } from '../../../../../../shared/modules/google-maps/google-maps.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreDeliveryZoneCreateFormComponent } from './components/store-delivery-zone-create-form/store-delivery-zone-create-form.component';
import { StoreDeliveryZoneCrudComponent } from './components/store-delivery-zone-crud/store-delivery-zone-crud.component';
import { StoreDeliveryZoneFilterFormComponent } from './components/store-delivery-zone-filter-form/store-delivery-zone-filter-form.component';
import { StoreDeliveryZoneUpdateFormComponent } from './components/store-delivery-zone-update-form/store-delivery-zone-update-form.component';
import { StoreDeliveryZoneRouterModule } from './store-delivery-zone-router.module';

@NgModule({
  declarations: [
    StoreDeliveryZoneCrudComponent,
    StoreDeliveryZoneCreateFormComponent,
    StoreDeliveryZoneUpdateFormComponent,
    StoreDeliveryZoneFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreDeliveryZoneRouterModule, GoogleMapsCustomComponentsModule],
})
export class StoreDeliveryZoneModule {}

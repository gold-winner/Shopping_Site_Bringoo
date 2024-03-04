import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreDeliverySlotCreateFormComponent } from './components/store-delivery-slot-create-form/store-delivery-slot-create-form.component';
import { StoreDeliverySlotCrudComponent } from './components/store-delivery-slot-crud/store-delivery-slot-crud.component';
import { StoreDeliverySlotFilterFormComponent } from './components/store-delivery-slot-filter-form/store-delivery-slot-filter-form.component';
import { StoreDeliverySlotUpdateFormComponent } from './components/store-delivery-slot-update-form/store-delivery-slot-update-form.component';
import { StoreDeliverySlotRouterModule } from './store-delivery-slot-router.module';

@NgModule({
  declarations: [
    StoreDeliverySlotCrudComponent,
    StoreDeliverySlotCreateFormComponent,
    StoreDeliverySlotUpdateFormComponent,
    StoreDeliverySlotFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreDeliverySlotRouterModule],
})
export class StoreDeliverySlotModule {}

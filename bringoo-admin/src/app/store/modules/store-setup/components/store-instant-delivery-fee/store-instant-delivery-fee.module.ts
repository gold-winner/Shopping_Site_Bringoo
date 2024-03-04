import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreInstantDeliveryFeeCreateFormComponent } from './components/store-instant-delivery-fee-create-form/store-instant-delivery-fee-create-form.component';
import { StoreInstantDeliveryFeeCrudComponent } from './components/store-instant-delivery-fee-crud/store-instant-delivery-fee-crud.component';
import { StoreInstantDeliveryFeeFilterFormComponent } from './components/store-instant-delivery-fee-filter-form/store-instant-delivery-fee-filter-form.component';
import { StoreInstantDeliveryFeeUpdateFormComponent } from './components/store-instant-delivery-fee-update-form/store-instant-delivery-fee-update-form.component';
import { StoreInstantDeliveryFeeRouterModule } from './store-instant-delivery-fee-router.module';

@NgModule({
  declarations: [
    StoreInstantDeliveryFeeCrudComponent,
    StoreInstantDeliveryFeeCreateFormComponent,
    StoreInstantDeliveryFeeUpdateFormComponent,
    StoreInstantDeliveryFeeFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreInstantDeliveryFeeRouterModule],
})
export class StoreInstantDeliveryFeeModule {}

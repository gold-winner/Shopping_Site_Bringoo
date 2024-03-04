import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreScheduledDeliveryFeeCreateFormComponent } from './components/store-scheduled-delivery-fee-create-form/store-scheduled-delivery-fee-create-form.component';
import { StoreScheduledDeliveryFeeCrudComponent } from './components/store-scheduled-delivery-fee-crud/store-scheduled-delivery-fee-crud.component';
import { StoreScheduledDeliveryFeeFilterFormComponent } from './components/store-scheduled-delivery-fee-filter-form/store-scheduled-delivery-fee-filter-form.component';
import { StoreScheduledDeliveryFeeUpdateFormComponent } from './components/store-scheduled-delivery-fee-update-form/store-scheduled-delivery-fee-update-form.component';
import { StoreScheduledDeliveryFeeRouterModule } from './store-scheduled-delivery-fee-router.module';

@NgModule({
  declarations: [
    StoreScheduledDeliveryFeeCrudComponent,
    StoreScheduledDeliveryFeeCreateFormComponent,
    StoreScheduledDeliveryFeeUpdateFormComponent,
    StoreScheduledDeliveryFeeFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreScheduledDeliveryFeeRouterModule],
})
export class StoreScheduledDeliveryFeeModule {}

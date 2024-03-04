import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreCommissionFeeStoreCreateFormComponent } from './components/store-commission-fee-store-create-form/store-commission-fee-store-create-form.component';
import { StoreCommissionFeeStoreCrudComponent } from './components/store-commission-fee-store-crud/store-commission-fee-store-crud.component';
import { StoreCommissionFeeStoreFilterFormComponent } from './components/store-commission-fee-store-filter-form/store-commission-fee-store-filter-form.component';
import { StoreCommissionFeeStoreUpdateFormComponent } from './components/store-commission-fee-store-update-form/store-commission-fee-store-update-form.component';
import { StoreCommissionFeeStoreRoutingModule } from './store-commission-fee-store-routing.module';

@NgModule({
  declarations: [
    StoreCommissionFeeStoreCrudComponent,
    StoreCommissionFeeStoreCreateFormComponent,
    StoreCommissionFeeStoreUpdateFormComponent,
    StoreCommissionFeeStoreFilterFormComponent,
  ],
  imports: [StoreCommissionFeeStoreRoutingModule, SharedModule, CrudModule],
})
export class StoreCommissionFeeStoreModule {}

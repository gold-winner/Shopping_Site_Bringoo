import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreCommissionFeeProductCreateFormComponent } from './components/store-commission-fee-product-create-form/store-commission-fee-product-create-form.component';
import { StoreCommissionFeeProductCrudComponent } from './components/store-commission-fee-product-crud/store-commission-fee-product-crud.component';
import { StoreCommissionFeeProductFilterFormComponent } from './components/store-commission-fee-product-filter-form/store-commission-fee-product-filter-form.component';
import { StoreCommissionFeeProductRoutingModule } from './store-commission-fee-product-routing.module';

@NgModule({
  declarations: [
    StoreCommissionFeeProductCrudComponent,
    StoreCommissionFeeProductCreateFormComponent,
    StoreCommissionFeeProductFilterFormComponent,
  ],
  imports: [StoreCommissionFeeProductRoutingModule, SharedModule, CrudModule],
  exports: [StoreCommissionFeeProductCrudComponent],
})
export class StoreCommissionFeeProductModule {}

import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreCommissionFeeSubcategoryCreateFormComponent } from './components/store-commission-fee-subcategory-create-form/store-commission-fee-subcategory-create-form.component';
import { StoreCommissionFeeSubcategoryCrudComponent } from './components/store-commission-fee-subcategory-crud/store-commission-fee-subcategory-crud.component';
import { StoreCommissionFeeSubcategoryFilterFormComponent } from './components/store-commission-fee-subcategory-filter-form/store-commission-fee-subcategory-filter-form.component';
import { StoreCommissionFeeSubcategoryUpdateFormComponent } from './components/store-commission-fee-subcategory-update-form/store-commission-fee-subcategory-update-form.component';
import { StoreCommissionFeeSubcategoryRoutingModule } from './store-commission-fee-subcategory-routing.module';

@NgModule({
  declarations: [
    StoreCommissionFeeSubcategoryCrudComponent,
    StoreCommissionFeeSubcategoryCreateFormComponent,
    StoreCommissionFeeSubcategoryUpdateFormComponent,
    StoreCommissionFeeSubcategoryFilterFormComponent,
  ],
  imports: [StoreCommissionFeeSubcategoryRoutingModule, SharedModule, CrudModule],
})
export class StoreCommissionFeeSubcategoryModule {}

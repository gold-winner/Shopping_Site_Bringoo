import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreCommissionFeeCategoryCreateFormComponent } from './components/store-commission-fee-category-create-form/store-commission-fee-category-create-form.component';
import { StoreCommissionFeeCategoryCrudComponent } from './components/store-commission-fee-category-crud/store-commission-fee-category-crud.component';
import { StoreCommissionFeeCategoryFilterFormComponent } from './components/store-commission-fee-category-filter-form/store-commission-fee-category-filter-form.component';
import { StoreCommissionFeeCategoryUpdateFormComponent } from './components/store-commission-fee-category-update-form/store-commission-fee-category-update-form.component';
import { StoreCommissionFeeCategoryRoutingModule } from './store-commission-fee-category-routing.module';

@NgModule({
  declarations: [
    StoreCommissionFeeCategoryCrudComponent,
    StoreCommissionFeeCategoryCreateFormComponent,
    StoreCommissionFeeCategoryUpdateFormComponent,
    StoreCommissionFeeCategoryFilterFormComponent,
  ],
  imports: [StoreCommissionFeeCategoryRoutingModule, SharedModule, CrudModule],
})
export class StoreCommissionFeeCategoryModule {}

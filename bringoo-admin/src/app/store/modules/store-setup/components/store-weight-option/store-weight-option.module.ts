import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreWeightOptionCreateFormComponent } from './components/store-weight-option-create-form/store-weight-option-create-form.component';
import { StoreWeightOptionCrudComponent } from './components/store-weight-option-crud/store-weight-option-crud.component';
import { StoreWeightOptionFilterFormComponent } from './components/store-weight-option-filter-form/store-weight-option-filter-form.component';
import { StoreWeightOptionUpdateFormComponent } from './components/store-weight-option-update-form/store-weight-option-update-form.component';
import { StoreWeightOptionRouterModule } from './store-weight-option-router.module';

@NgModule({
  declarations: [
    StoreWeightOptionCrudComponent,
    StoreWeightOptionCreateFormComponent,
    StoreWeightOptionUpdateFormComponent,
    StoreWeightOptionFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreWeightOptionRouterModule],
})
export class StoreWeightOptionModule {}

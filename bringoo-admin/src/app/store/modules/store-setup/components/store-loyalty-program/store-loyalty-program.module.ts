import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreLoyaltyProgramCreateFormComponent } from './components/store-loyalty-program-create-form/store-loyalty-program-create-form.component';
import { StoreLoyaltyProgramCrudComponent } from './components/store-loyalty-program-crud/store-loyalty-program-crud.component';
import { StoreLoyaltyProgramFilterComponent } from './components/store-loyalty-program-filter/store-loyalty-program-filter.component';
import { StoreLoyaltyProgramRouterModule } from './store-loyalty-program-router.module';

@NgModule({
  declarations: [StoreLoyaltyProgramCrudComponent, StoreLoyaltyProgramCreateFormComponent, StoreLoyaltyProgramFilterComponent],
  imports: [SharedModule, CrudModule, StoreLoyaltyProgramRouterModule],
})
export class StoreLoyaltyProgramModule {}

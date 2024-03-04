import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { LoyaltyProgramSetupCreateFormComponent } from './components/loyalty-program-setup-create-form/loyalty-program-setup-create-form.component';
import { LoyaltyProgramSetupCrudComponent } from './components/loyalty-program-setup-crud/loyalty-program-setup-crud.component';
import { LoyaltyProgramSetupFilterFormComponent } from './components/loyalty-program-setup-filter-form/loyalty-program-setup-filter-form.component';
import { LoyaltyProgramSetupUpdateFormComponent } from './components/loyalty-program-setup-update-form/loyalty-program-setup-update-form.component';
import { LoyaltyProgramSetupRouterModule } from './loyalty-program-setup-router.module';

@NgModule({
  declarations: [
    LoyaltyProgramSetupCrudComponent,
    LoyaltyProgramSetupCreateFormComponent,
    LoyaltyProgramSetupUpdateFormComponent,
    LoyaltyProgramSetupFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, LoyaltyProgramSetupRouterModule],
  exports: [LoyaltyProgramSetupFilterFormComponent],
})
export class LoyaltyProgramSetupModule {}

import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { DepositTypeSetupCreateFormComponent } from './components/deposit-type-setup-create-form/deposit-type-setup-create-form.component';
import { DepositTypeSetupCrudComponent } from './components/deposit-type-setup-crud/deposit-type-setup-crud.component';
import { DepositTypeSetupFilterFormComponent } from './components/deposit-type-setup-filter-form/deposit-type-setup-filter-form.component';
import { DepositTypeSetupUpdateFormComponent } from './components/deposit-type-setup-update-form/deposit-type-setup-update-form.component';
import { DepositTypeRouterModule } from './deposit-type-router.module';

@NgModule({
  declarations: [
    DepositTypeSetupCrudComponent,
    DepositTypeSetupCreateFormComponent,
    DepositTypeSetupUpdateFormComponent,
    DepositTypeSetupFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, DepositTypeRouterModule],
  exports: [DepositTypeSetupFilterFormComponent],
})
export class DepositTypeSetupModule {}

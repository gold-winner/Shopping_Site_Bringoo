import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoyaltyProgramSetupCrudComponent } from './components/loyalty-program-setup-crud/loyalty-program-setup-crud.component';

const routes: Routes = [{ path: '', component: LoyaltyProgramSetupCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyaltyProgramSetupRouterModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepositTypeSetupCrudComponent } from './components/deposit-type-setup-crud/deposit-type-setup-crud.component';

const routes: Routes = [{ path: '', component: DepositTypeSetupCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositTypeRouterModule {}

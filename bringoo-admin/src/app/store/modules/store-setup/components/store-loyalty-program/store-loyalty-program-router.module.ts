import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreLoyaltyProgramCrudComponent } from './components/store-loyalty-program-crud/store-loyalty-program-crud.component';

const routes: Routes = [{ path: '', component: StoreLoyaltyProgramCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreLoyaltyProgramRouterModule {}

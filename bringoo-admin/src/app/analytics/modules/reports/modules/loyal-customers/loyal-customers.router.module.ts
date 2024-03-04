import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoyalCustomersComponent } from './components/loyal-customers/loyal-customers.component';

const routes: Routes = [{ path: '', component: LoyalCustomersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyalCustomersRouterModule {}

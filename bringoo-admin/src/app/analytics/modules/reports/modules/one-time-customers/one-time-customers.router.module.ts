import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OneTimeCustomersComponent } from './components/one-time-customers/one-time-customers.component';

const routes: Routes = [{ path: '', component: OneTimeCustomersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRouterModule {}

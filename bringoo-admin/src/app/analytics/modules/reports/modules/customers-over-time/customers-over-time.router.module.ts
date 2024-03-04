import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersOverTimeComponent } from './components/customers-over-time/customers-over-time.component';

const routes: Routes = [{ path: '', component: CustomersOverTimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRouterModule {}

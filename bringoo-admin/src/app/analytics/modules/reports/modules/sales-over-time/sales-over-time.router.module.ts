import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesOverTimeComponent } from './components/sales-over-time/sales-over-time.component';

const routes: Routes = [{ path: '', component: SalesOverTimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRouterModule {}

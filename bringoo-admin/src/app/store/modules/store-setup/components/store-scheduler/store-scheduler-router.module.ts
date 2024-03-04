import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreSchedulerComponent } from './components/store-scheduler/store-scheduler.component';

const routes: Routes = [{ path: '', component: StoreSchedulerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreSchedulerRouterModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffJobCancelReasonCrudComponent } from './components/staff-job-cancel-reason-crud/staff-job-cancel-reason-crud.component';

const routes: Routes = [{ path: '', component: StaffJobCancelReasonCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffJobCancelReasonRouterModule {}

import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StaffJobCancelReasonCreateFormComponent } from './components/staff-job-cancel-reason-create-form/staff-job-cancel-reason-create-form.component';
import { StaffJobCancelReasonCrudComponent } from './components/staff-job-cancel-reason-crud/staff-job-cancel-reason-crud.component';
import { StaffJobCancelReasonFilterFormComponent } from './components/staff-job-cancel-reason-filter-form/staff-job-cancel-reason-filter-form.component';
import { StaffJobCancelReasonUpdateFormComponent } from './components/staff-job-cancel-reason-update-form/staff-job-cancel-reason-update-form.component';
import { StaffJobCancelReasonRouterModule } from './staff-job-cancel-reason-router.module';

@NgModule({
  declarations: [
    StaffJobCancelReasonCrudComponent,
    StaffJobCancelReasonCreateFormComponent,
    StaffJobCancelReasonUpdateFormComponent,
    StaffJobCancelReasonFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StaffJobCancelReasonRouterModule],
})
export class StaffJobCancelReasonModule {}

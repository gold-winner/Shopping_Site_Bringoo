import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffAppComponent } from './components/staff-app/staff-app.component';
import { StaffAppSettingsComponent } from './components/staff-app-settings/staff-app-settings.component';
import { StaffJobCancelReasonModule } from './modules/staff-job-cancel-reason/staff-job-cancel-reason.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StaffAppComponent,
  },
  {
    path: 'settings',
    data: {
      breadcrumb: 'Settings',
    },
    component: StaffAppSettingsComponent,
  },
  {
    path: 'job-cancel-reason',
    data: {
      breadcrumb: 'Job Cancel Reason',
    },
    loadChildren: (): Promise<Type<StaffJobCancelReasonModule>> =>
      import('./modules/staff-job-cancel-reason/staff-job-cancel-reason.module').then(
        (m: { StaffJobCancelReasonModule: Type<StaffJobCancelReasonModule> }) => m.StaffJobCancelReasonModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffAppRouterModule {}

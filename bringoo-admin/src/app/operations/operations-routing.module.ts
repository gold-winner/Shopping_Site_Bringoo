import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { OperationsCardPageComponent } from './components/operations-card-page/operations-card-page.component';
import { OpsTeamDashboardModule } from './modules/ops-team-dashboard/ops-team-dashboard.module';
import { StaffLiveMapModule } from './modules/staff-live-map/staff-live-map.module';

const routes: Routes = [
  {
    path: 'staff-live-map',
    data: { breadcrumb: 'Staff Live Map' },
    loadChildren: (): Promise<Type<StaffLiveMapModule>> =>
      import('./modules/staff-live-map/staff-live-map.module').then(
        (m: { StaffLiveMapModule: Type<StaffLiveMapModule> }) => m.StaffLiveMapModule,
      ),
  },
  {
    path: 'ops-team-dashboard',
    data: { breadcrumb: 'Ops Team Dashboard' },
    loadChildren: (): Promise<Type<OpsTeamDashboardModule>> =>
      import('./modules/ops-team-dashboard/ops-team-dashboard.module').then(
        (m: { OpsTeamDashboardModule: Type<OpsTeamDashboardModule> }) => m.OpsTeamDashboardModule,
      ),
  },
  { path: '', pathMatch: 'full', component: OperationsCardPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}

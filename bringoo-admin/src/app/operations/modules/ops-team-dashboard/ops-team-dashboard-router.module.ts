import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpsTeamDashboardComponent } from './components/ops-team-dashboard/ops-team-dashboard.component';

const routes: Routes = [
  {
    path: '**',
    data: { breadcrumb: 'Ops Team Dashboard' },
    component: OpsTeamDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpsTeamDashboardRouterModule {}

import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { OpsTeamDashboardComponent } from './components/ops-team-dashboard/ops-team-dashboard.component';
import { OpsTeamDashboardFilterComponent } from './components/ops-team-dashboard-filter/ops-team-dashboard-filter.component';
import { OpsTeamDashboardRouterModule } from './ops-team-dashboard-router.module';

@NgModule({
  declarations: [OpsTeamDashboardComponent, OpsTeamDashboardFilterComponent],
  imports: [OpsTeamDashboardRouterModule, SharedModule],
  exports: [],
})
export class OpsTeamDashboardModule {}

import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { SharedModule } from '../../../../shared/shared.module';
import { HomeDashboardComponent } from './components/dashboard/home-dashboard.component';
import { DashboardRouterModule } from './dashboard.router.module';

@NgModule({
  declarations: [HomeDashboardComponent],
  imports: [SharedModule, DashboardRouterModule, GoogleMapsModule],
})
export class DashboardModule {}

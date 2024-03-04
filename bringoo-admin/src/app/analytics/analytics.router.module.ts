import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ReportsModule } from './modules/reports/reports.module';

const routes: Routes = [
  {
    path: 'reports',
    data: { breadcrumb: 'Reports' },
    loadChildren: (): Promise<Type<ReportsModule>> =>
      import('./modules/reports/reports.module').then((m: { ReportsModule: Type<ReportsModule> }) => m.ReportsModule),
  },
  {
    path: 'dashboard',
    data: { breadcrumb: 'Dashboard' },
    loadChildren: (): Promise<Type<DashboardModule>> =>
      import('./modules/dashboard/dashboard.module').then((m: { DashboardModule: Type<DashboardModule> }) => m.DashboardModule),
  },
  {
    path: 'live-view',
    data: { breadcrumb: 'Live view' },
    loadChildren: (): Promise<Type<DashboardModule>> =>
      import('./modules/dashboard/dashboard.module').then((m: { DashboardModule: Type<DashboardModule> }) => m.DashboardModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'reports' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRouterModule {}

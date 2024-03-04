import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartnerAppComponent } from './components/partner-app/partner-app.component';
import { PartnerAppSettingsComponent } from './components/partner-app-settings/partner-app-settings.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PartnerAppComponent,
  },
  {
    path: 'settings',
    data: {
      breadcrumb: 'Settings',
    },
    component: PartnerAppSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerAppRouterModule {}

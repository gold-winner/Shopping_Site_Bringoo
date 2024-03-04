import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerAppComponent } from './components/customer-app/customer-app.component';
import { CustomerAppSettingsComponent } from './components/customer-app-settings/customer-app-settings.component';
import { CustomerCartMaxWeightSettingComponent } from './components/customer-cart-max-weight-setting/customer-cart-max-weight-setting.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CustomerAppComponent,
  },
  {
    path: 'settings',
    data: {
      breadcrumb: 'Settings',
    },
    component: CustomerAppSettingsComponent,
  },
  {
    path: 'max-weight',
    data: {
      breadcrumb: 'Cart Max Weight',
    },
    component: CustomerCartMaxWeightSettingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerAppRouterModule {}

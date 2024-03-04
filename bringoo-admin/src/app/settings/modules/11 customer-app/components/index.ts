import { NgModule } from '@angular/core';

import { CustomerAppComponent } from './customer-app/customer-app.component';
import { CustomerAppSettingsComponent } from './customer-app-settings/customer-app-settings.component';
import { CustomerCartMaxWeightSettingComponent } from './customer-cart-max-weight-setting/customer-cart-max-weight-setting.component';

export const components: Required<NgModule>['declarations'] = [
  CustomerAppComponent,
  CustomerAppSettingsComponent,
  CustomerCartMaxWeightSettingComponent,
];

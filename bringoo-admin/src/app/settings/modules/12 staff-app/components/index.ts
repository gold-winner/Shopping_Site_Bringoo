import { NgModule } from '@angular/core';

import { StaffAppComponent } from './staff-app/staff-app.component';
import { StaffAppSettingsComponent } from './staff-app-settings/staff-app-settings.component';

export const components: Required<NgModule>['declarations'] = [StaffAppComponent, StaffAppSettingsComponent];

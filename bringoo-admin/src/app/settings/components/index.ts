import { NgModule } from '@angular/core';

import { SettingsCardsPageComponent } from './settings-cards-page/settings-cards-page.component';
import { SettingsLayoutComponent } from './settings-layout/settings-layout.component';

export const settingsComponents: Required<NgModule>['declarations'] = [SettingsCardsPageComponent, SettingsLayoutComponent];

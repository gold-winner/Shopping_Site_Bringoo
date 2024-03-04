import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { settingsComponents } from './components';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [...settingsComponents],
  imports: [SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}

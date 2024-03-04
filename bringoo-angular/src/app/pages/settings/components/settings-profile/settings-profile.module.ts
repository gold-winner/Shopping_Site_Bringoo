import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../shared/shared.module';
import { SettingsAddAddressComponent } from './add-address/add-address.component';
import { SettingsAddCardComponent } from './add-card/add-card.component';
import { SettingsDeleteAccountComponent } from './delete-account/delete-account.component';
import { SettingsDeleteAddressComponent } from './delete-address/delete-address.component';
import { SettingsDeleteCardComponent } from './delete-card/delete-card.component';
import { SettingsEditAccountComponent } from './edit-account/edit-account.component';
@NgModule({
  declarations: [
    SettingsAddAddressComponent,
    SettingsDeleteAccountComponent,
    SettingsDeleteCardComponent,
    SettingsDeleteAddressComponent,
    SettingsEditAccountComponent,
    SettingsAddCardComponent,
  ],
  imports: [SharedModule, CommonModule],
  exports: [
    SettingsAddAddressComponent,
    SettingsDeleteAccountComponent,
    SettingsDeleteCardComponent,
    SettingsDeleteAddressComponent,
    SettingsEditAccountComponent,
    SettingsAddCardComponent,
  ],
})
export class SettingsProfileModule {}

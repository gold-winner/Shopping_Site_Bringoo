import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SharedModule } from '../../../shared/shared.module';
import { SettingsContactComponent } from './components/settings-contact/settings-contact.component';
import { SettingsFaqComponent } from './components/settings-faq/settings-faq.component';
import { SettingsFavoriteComponent } from './components/settings-favorite/settings-favorite.component';
import { SettingsFilterComponent } from './components/settings-filter/settings-filter.component';
import { SettingsHistoryComponent } from './components/settings-history/settings-history.component';
import { SettingsHistoryModule } from './components/settings-history/settings-history.module';
import { SettingsNotificationComponent } from './components/settings-notification/settings-notification.component';
import { SettingsOrderComponent } from './components/settings-order/settings-order.component';
import { SettingsOrderModule } from './components/settings-order/settings-order.module';
import { SettingsPasswordComponent } from './components/settings-password/settings-password.component';
import { SettingsProfileComponent } from './components/settings-profile/settings-profile.component';
import { SettingsProfileModule } from './components/settings-profile/settings-profile.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
@NgModule({
  declarations: [
    SettingsComponent,
    SettingsFavoriteComponent,
    SettingsProfileComponent,
    SettingsOrderComponent,
    SettingsHistoryComponent,
    SettingsNotificationComponent,
    SettingsPasswordComponent,
    SettingsContactComponent,
    SettingsFilterComponent,
    SettingsFaqComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    SettingsRoutingModule,
    SettingsProfileModule,
    SettingsOrderModule,
    SettingsHistoryModule,
    NgxSkeletonLoaderModule.forRoot(),
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}

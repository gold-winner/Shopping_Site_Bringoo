import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsContactComponent } from './components/settings-contact/settings-contact.component';
import { SettingsFaqComponent } from './components/settings-faq/settings-faq.component';
import { SettingsFavoriteComponent } from './components/settings-favorite/settings-favorite.component';
import { SettingsFilterComponent } from './components/settings-filter/settings-filter.component';
import { SettingsHistoryComponent } from './components/settings-history/settings-history.component';
import { SettingsNotificationComponent } from './components/settings-notification/settings-notification.component';
import { SettingsOrderComponent } from './components/settings-order/settings-order.component';
import { SettingsPasswordComponent } from './components/settings-password/settings-password.component';
import { SettingsProfileComponent } from './components/settings-profile/settings-profile.component';
const routes: Routes = [
  { path: '', redirectTo: 'profile' },
  { path: 'profile', component: SettingsProfileComponent },
  { path: 'favorite', component: SettingsFavoriteComponent },
  { path: 'order', component: SettingsOrderComponent },
  { path: 'history', component: SettingsHistoryComponent },
  { path: 'notification', component: SettingsNotificationComponent },
  { path: 'change-password', component: SettingsPasswordComponent },
  { path: 'contact', component: SettingsContactComponent },
  { path: 'products-filter', component: SettingsFilterComponent },
  { path: 'faq', component: SettingsFaqComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}

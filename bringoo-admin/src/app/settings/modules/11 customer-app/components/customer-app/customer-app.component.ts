import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SETTINGS_CARDS } from '../../../../../../shared/config/settings-cards.config';
import { SettingsCardModel } from '../../../../../../shared/models/settings-card.model';

@Component({
  selector: 'app-settings-customer-app',
  templateUrl: 'customer-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAppComponent {
  general?: SettingsCardModel;

  constructor() {
    this.general = SETTINGS_CARDS.find(({ path }: SettingsCardModel) => path === '/settings/customer-app');
  }
}

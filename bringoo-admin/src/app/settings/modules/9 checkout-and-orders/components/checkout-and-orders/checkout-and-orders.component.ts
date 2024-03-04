import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SETTINGS_CARDS } from '../../../../../../shared/config/settings-cards.config';
import { SettingsCardModel } from '../../../../../../shared/models/settings-card.model';

@Component({
  selector: 'app-settings-checkout-and-orders',
  templateUrl: 'checkout-and-orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutAndOrdersComponent {
  general?: SettingsCardModel;

  constructor() {
    this.general = SETTINGS_CARDS.find(({ path }: SettingsCardModel) => path === '/settings/checkout-orders');
  }
}

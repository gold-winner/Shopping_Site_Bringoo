import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SETTINGS_CARDS } from '../../../../../../shared/config/settings-cards.config';
import { SettingsCardModel } from '../../../../../../shared/models/settings-card.model';

@Component({
  selector: 'app-settings-product-management',
  templateUrl: 'product-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductManagementComponent {
  general?: SettingsCardModel;

  constructor() {
    this.general = SETTINGS_CARDS.find(({ path }: SettingsCardModel) => path === '/settings/product-management');
  }
}

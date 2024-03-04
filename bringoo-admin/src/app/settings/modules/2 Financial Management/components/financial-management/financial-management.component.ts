import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SETTINGS_CARDS } from '../../../../../../shared/config/settings-cards.config';
import { SettingsCardModel } from '../../../../../../shared/models/settings-card.model';

@Component({
  selector: 'app-settings-financial-management',
  templateUrl: 'financial-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialManagementComponent {
  general?: SettingsCardModel;

  constructor() {
    this.general = SETTINGS_CARDS.find(({ path }: SettingsCardModel) => path === '/settings/financial-management');
  }
}

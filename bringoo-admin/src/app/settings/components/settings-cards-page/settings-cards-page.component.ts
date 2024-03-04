import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SETTINGS_CARDS } from '../../../../shared/config/settings-cards.config';
import { SettingsCardModel } from '../../../../shared/models/settings-card.model';

@Component({
  selector: 'app-settings-cards-page',
  templateUrl: './settings-cards-page.component.html',
  styleUrls: ['./settings-cards-page.component.scss'],
  host: { class: 'd-block mx-6 mb-6 mt-6' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsCardsPageComponent {
  settingsCardConfig: SettingsCardModel[] = SETTINGS_CARDS;
  searchValue: string = '';

  onSearchChange(str: string): void {
    this.searchValue = str;
  }
}

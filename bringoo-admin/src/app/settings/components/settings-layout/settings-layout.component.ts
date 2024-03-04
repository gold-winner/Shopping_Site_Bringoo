import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { SETTINGS_CARDS } from '../../../../shared/config/settings-cards.config';
import { SettingsCardModel } from '../../../../shared/models/settings-card.model';

@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block h-100p p-6' },
})
export class SettingsLayoutComponent {
  sitemap: SettingsCardModel[] = SETTINGS_CARDS;
  collapsed: boolean = false;

  constructor(public router: Router) {}
}

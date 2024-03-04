import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SITEMAP_CONFIG } from '../../../../shared/config/sitemap.config';
import { MenuLinkModel } from '../../../../shared/interfaces/menu-link.model';
import { CardLink, SettingsCardModel } from '../../../../shared/models/settings-card.model';

@Component({
  selector: 'app-operations-card-page',
  templateUrl: './operations-card-page.component.html',
  styleUrls: ['./operations-card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsCardPageComponent {
  settingsCardConfig: SettingsCardModel[] = [];
  searchValue: string = '';

  constructor() {
    const model: MenuLinkModel | undefined = SITEMAP_CONFIG.find((v: MenuLinkModel) => v.path === 'operations');
    if (model && model.children) {
      this.settingsCardConfig = [
        {
          title: 'Operations',
          showInMenu: true,
          path: './',
          icon: '',
          links: [...model.children.map((value: MenuLinkModel): CardLink => ({ title: value.title, path: value.path }))],
        },
      ];
    }
  }

  onSearchChange(str: string): void {
    this.searchValue = str;
  }
}

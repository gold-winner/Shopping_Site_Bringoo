import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SITEMAP_CONFIG } from '../../../../shared/config/sitemap.config';
import { MenuLinkModel } from '../../../../shared/interfaces/menu-link.model';
import { CardLink, SettingsCardModel } from '../../../../shared/models/settings-card.model';

@Component({
  selector: 'app-operations-card-page',
  templateUrl: './orders-card-page.component.html',
  styleUrls: ['./orders-card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersCardPageComponent {
  settingsCardConfig: SettingsCardModel[] = [];
  searchValue: string = '';

  constructor() {
    const model: MenuLinkModel | undefined = SITEMAP_CONFIG.find((v: MenuLinkModel) => v.path === 'orders');
    if (model && model.children) {
      this.settingsCardConfig = [
        {
          title: 'Orders',
          path: './',
          showInMenu: true,
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

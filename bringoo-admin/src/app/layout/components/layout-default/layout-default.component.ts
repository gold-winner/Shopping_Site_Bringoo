import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { environment } from '../../../../environments/environment';
import { SITEMAP_CONFIG } from '../../../../shared/config/sitemap.config';
import { MenuLinkModel } from '../../../../shared/interfaces/menu-link.model';

@UntilDestroy()
@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDefaultComponent {
  readonly sitemap: MenuLinkModel[] = SITEMAP_CONFIG;
  isCollapsed = false;

  partnersUrl = environment.partnersPageUrl;
}

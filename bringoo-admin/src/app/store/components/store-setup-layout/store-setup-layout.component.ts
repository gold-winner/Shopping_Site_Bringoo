import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

import { CrudStoreService } from '../../../../shared/api/auth/crud-store.service';
import { StoreEntity } from '../../../../shared/api/auth/data-contracts';
import { STORE_SETUP_MENU } from '../../../../shared/config/store-setup.config';
import { CardLink } from '../../../../shared/models/settings-card.model';
import { BreadCrumbService } from '../../../../shared/services/bread-crumb.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { StoreDetailsService } from '../../services/store-details.service';

@UntilDestroy()
@Component({
  selector: 'app-store-setup-layout',
  templateUrl: './store-setup-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreSetupLayoutComponent {
  sitemap: CardLink[] = STORE_SETUP_MENU;
  storeName: string = '';
  storeId: string = this.route.parent?.snapshot.params['id'];
  cardLink: CardLink = { title: 'Basic information', path: 'basic-information' };

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private readonly navigationService: NavigationService,
    private breadCrumbService: BreadCrumbService,
    private service: CrudStoreService,
    private storeDetailsBreadService: StoreDetailsService,
  ) {
    service
      .findOne(this.route.parent?.snapshot.params['id'], { fields: 'name_i18n,code', softDelete: true })
      .subscribe((store: StoreEntity) => {
        if (store?.name_i18n) {
          this.storeName = store.name_i18n;
          this.storeDetailsBreadService.storeName = store.name_i18n;
          this.setBreadCrumbs();
        }

        if (store) {
          this.storeDetailsBreadService.store = store;
        }
      });
    this.navigationSubscribe();
    this.setInitBreadCrumbs();
    this.storeDetailsBreadSubscribe();
  }

  setBreadCrumbs(): void {
    this.breadCrumbService.resetBreadCrumbs([
      {
        path: 'store/stores',
        title: 'Stores',
      },
      {
        path: `store/stores/${this.storeId}/basic-information`,
        title: this.storeName,
      },
      this.cardLink,
      ...this.storeDetailsBreadService.breadcrumbs,
    ]);
  }

  navigationSubscribe(): void {
    this.navigationService.navigationEnd$
      .pipe(
        untilDestroyed(this),
        tap((currentNavigation: NavigationEnd) => {
          const currentCardLink: CardLink | undefined = this.sitemap.find(({ path }: CardLink) => currentNavigation.url.includes(path));
          this.setCartLink(currentCardLink);
          this.setBreadCrumbs();
        }),
      )
      .subscribe();
  }

  setInitBreadCrumbs(): void {
    const cardLink: CardLink | undefined = this.sitemap.find(({ path }: CardLink) => this.router.url.includes(path));
    this.setCartLink(cardLink);
  }

  setCartLink(cardLink: CardLink | undefined): void {
    if (cardLink) {
      this.cardLink = {
        title: cardLink.title,
        path: this.router.url,
      };
    }
  }

  storeDetailsBreadSubscribe(): void {
    this.storeDetailsBreadService.crumbs$.subscribe(() => {
      this.setBreadCrumbs();
    });
  }
}

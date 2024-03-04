import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { BreadCrumbModel } from '../shared/models/bread-crumb-model.model';
import { BreadCrumbService } from '../shared/services/bread-crumb.service';
import { ColorThemeService } from '../shared/services/color-theme.service';
import { NavigationService } from '../shared/services/navigation.service';
import { PushNotificationService } from './push-notification/services';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  layout: Subject<string> = new Subject<string>();
  ignoreUrls: string[] = ['store/stores'];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pushNotificationService: PushNotificationService,
    private readonly themeService: ColorThemeService,
    private readonly breadCrumbService: BreadCrumbService,
    private readonly navigationService: NavigationService,
    private titleService: Title,
  ) {
    this.themeService.initTheme();
    this.breadCrumbService.resetBreadCrumbs(this.findBradCrumbs());
    this.navigationSubscribe();
    this.setTitle();
  }

  ngOnInit(): void {
    this.pushNotificationService
      .requestPermission()
      .pipe(switchMap(() => this.pushNotificationService.receiveMessage()))
      .subscribe();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const snapshot: any = this.activatedRoute?.firstChild?.snapshot;
        this.layout.next(snapshot?.data?.layout === 'auth' ? 'auth' : 'default');
      }
    });
  }

  setTitle(): void {
    this.breadCrumbService.breadcrumbs$
      .pipe(
        untilDestroyed(this),
        map((models: BreadCrumbModel[]) => models[models.length - 1]?.title ?? 'Admin'),
        tap((title: string) => {
          this.titleService.setTitle(`Bringoo - ${title}`);
        }),
      )
      .subscribe();
  }

  navigationSubscribe(): void {
    this.navigationService.locationUpdate$
      .pipe(
        untilDestroyed(this),
        filter(({ url }: NavigationEnd) => {
          for (const href of this.ignoreUrls) {
            if (url.includes(href)) return false;
          }
          return true;
        }),
        tap(() => this.breadCrumbService.resetBreadCrumbs(this.findBradCrumbs())),
      )
      .subscribe();
  }

  findBradCrumbs(): BreadCrumbModel[] {
    const crumbs: BreadCrumbModel[] = [
      {
        path: '/dashboard',
        title: 'Dashboard',
      },
    ];
    let children: ActivatedRoute | null = this.route;
    let path: string = '';

    while (children !== null) {
      if (
        children.snapshot &&
        children.snapshot.data.breadcrumb &&
        children.snapshot.routeConfig?.path !== '**' &&
        crumbs[crumbs.length - 1]?.title !== children.snapshot.data.breadcrumb
      ) {
        path = `${path}/${children.snapshot.routeConfig?.path}`;
        crumbs.push({
          title: children.snapshot.data.breadcrumb,
          path: path,
        });
      }
      children = children.firstChild;
    }
    return crumbs;
  }
}

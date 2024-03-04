import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, switchMapTo } from 'rxjs/operators';

import { AppManagerPushNotificationSubscriptionService } from '../../../../shared/api/auth/app-manager-push-notification-subscription.service';
import { LangCodeEnum, ManagerProfileDto } from '../../../../shared/api/auth/data-contracts';
import { ManagerProfileService } from '../../../../shared/api/auth/manager-profile.service';
import { ThemeTypeEnum } from '../../../../shared/enums/theme-type.enum';
import { AppLanguageService } from '../../../../shared/services/app-language.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { BreadCrumbService } from '../../../../shared/services/bread-crumb.service';
import { ColorThemeService } from '../../../../shared/services/color-theme.service';
import { DeviceService } from '../../../../shared/services/device.service';
import { LanguagesService } from '../../../../shared/services/languages.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { PushNotificationService } from '../../../push-notification/services';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  notReadedNotifications$: BehaviorSubject<string[]>;
  user$!: Observable<ManagerProfileDto>;
  language: UntypedFormControl = new UntypedFormControl(this.appLanguageService.language);
  languageList$!: Observable<string[]>;
  //todo remove when redesign is complete
  showCrumbs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  themeNames: ThemeTypeEnum[] = Object.values(ThemeTypeEnum) as ThemeTypeEnum[];

  constructor(
    private readonly breadCrumbService: BreadCrumbService,
    private readonly authenticationService: AuthenticationService,
    private readonly managerProfileService: ManagerProfileService,
    private readonly appLanguageService: AppLanguageService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    public readonly languagesService: LanguagesService,
    private readonly themeService: ColorThemeService,
    public readonly pushNotificationService: PushNotificationService,
    private readonly AppManagerPushNotificationSubscriptionService: AppManagerPushNotificationSubscriptionService,
    private readonly deviceService: DeviceService,
  ) {
    this.notReadedNotifications$ = this.pushNotificationService.notReadedNotifications$;
    this.languageList$ = this.languagesService.languages$;
  }

  toggleTheme(theme: ThemeTypeEnum): void {
    this.themeService.toggleTheme(theme).then();
  }

  ngOnInit(): void {
    this.loadLanguages();
    this.loadUser();
    this.languageChange();
    this.loadNotReadedNotifications();
    this.hideCrumbs();
  }

  //todo remove when redesign is complete
  hideCrumbs(): void {
    if (this.router.url.indexOf('/settings') === 0) {
      this.showCrumbs.next(false);
    }

    this.navigationService.navigationEnd$.subscribe(() => {
      if (this.router.url.indexOf('/settings') === 0) {
        this.showCrumbs.next(false);
      } else {
        if (!this.showCrumbs.value) {
          this.showCrumbs.next(true);
        }
      }
    });
  }

  loadNotReadedNotifications(): void {
    this.AppManagerPushNotificationSubscriptionService.refreshSubscription({ deviceId: this.deviceService.getDeviceInfo().deviceId })
      .pipe(switchMapTo(this.pushNotificationService.updateNotReadedNotifications()))
      .subscribe();
  }

  loadLanguages(): void {
    this.languagesService.loadLanguages.next(Symbol('load'));
  }

  onSignOut(): void {
    this.authenticationService.signOut();
  }

  loadUser(): void {
    this.user$ = this.authenticationService.userId$.pipe(
      filter(Boolean),
      switchMap((): Observable<ManagerProfileDto> => this.managerProfileService.profileGet()),
    );
  }

  openMyNotReadedHistoryPage(): void {
    this.router.navigate(['/notifications/all/my-unread']);
  }

  languageChange(): void {
    this.language.valueChanges.pipe(untilDestroyed(this)).subscribe((lang: LangCodeEnum) => (this.appLanguageService.language = lang));
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthManagerService } from '../../../../shared/api/auth/auth-manager.service';
import { CrudLanguageService } from '../../../../shared/api/auth/crud-language.service';
import { CrudManagerSessionService } from '../../../../shared/api/auth/crud-manager-session.service';
import {
  LanguageEntity,
  ManagerProfileDto,
  ManagerSessionEntity,
  Pageable,
  SalutationEnum,
} from '../../../../shared/api/auth/data-contracts';
import { ManagerProfileService } from '../../../../shared/api/auth/manager-profile.service';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../shared/config/country-hpone-codes.config';
import { SelectOptions } from '../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../shared/modules/crud/enums/cond-operator';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { DeviceService } from '../../../../shared/services/device.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  openPanel: BehaviorSubject<'changePassword' | 'userSettings' | 'SessionLogOut' | null> = new BehaviorSubject<
    'changePassword' | 'SessionLogOut' | 'userSettings' | null
  >(null);

  salutationList: string[] = Object.keys(SalutationEnum);
  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;

  user: BehaviorSubject<ManagerProfileDto | null> = new BehaviorSubject<ManagerProfileDto | null>(null);
  managerId: string = '';

  isLoading$: Observable<boolean> = this.managerProfileService.isLoading$;

  deviceId!: string;
  selectedSession: string | null = null;
  sessionsRefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sessions$!: Observable<Pageable & { items?: ManagerSessionEntity[] }>;

  changePasswordForm: UntypedFormGroup = this.fb.group({
    oldPassword: [null, [Validators.required]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]],
  });

  managerForm: UntypedFormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    dateOfBirth: [null],
    managerLanguageCode: [null],
    nationalityCode: [null],
    salutation: [null],
    phoneCountryCode: [null],
    phoneNumber: [null],
  });

  languageCode: SelectOptions<LanguageEntity> = {
    service: this.crudLanguageService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: LanguageEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly authManagerService: AuthManagerService,
    private readonly notification: NzNotificationService,
    private crudLanguageService: CrudLanguageService,
    private managerProfileService: ManagerProfileService,
    private readonly fb: UntypedFormBuilder,
    private readonly managerSessionService: CrudManagerSessionService,
    private readonly deviceService: DeviceService,
  ) {}

  ngOnInit(): void {
    this.onLoadDeviceData();
    this.formSubs();
    this.subscribeUserId();
    this.loadSessions();
  }

  onLoadDeviceData(): void {
    this.deviceId = this.deviceService.getDeviceInfo().deviceId;
  }

  formSubs(): void {
    this.managerForm.controls.phoneCountryCode.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((countryCode: string) => !countryCode && this.managerForm.patchValue({ phoneNumber: null }));

    this.user.pipe(untilDestroyed(this)).subscribe((manager: ManagerProfileDto | null) => {
      if (manager) {
        this.managerForm.patchValue(manager);
      }
    });

    this.managerProfileService.profileGet().subscribe((managerProfileDto: ManagerProfileDto) => {
      this.user.next(managerProfileDto);
    });
  }

  subscribeUserId(): void {
    this.authenticationService.userId$.subscribe((managerId: string | null) => {
      if (managerId) {
        this.managerId = managerId;
        this.sessionsRefresh.next(true);
      }
    });
  }

  loadSessions(): void {
    this.sessions$ = this.sessionsRefresh.asObservable().pipe(
      switchMap(
        (): Observable<Pageable & { items?: ManagerSessionEntity[] }> => {
          return this.managerSessionService.find({
            s: JSON.stringify({ managerId: this.managerId }),
            fields: 'deviceType,deviceOs,id,deviceId',
          });
        },
      ),
    );
  }

  onCloseDrawer(): void {
    this.openPanel.next(null);
  }

  onChangePassword(): void {
    if (this.changePasswordForm.valid) {
      this.authManagerService.changePassword(this.changePasswordForm.value).subscribe(() => {
        this.onCloseDrawer();
      });
    }
  }

  onUpdateUser(): void {
    if (this.managerForm.valid) {
      this.managerProfileService.profileUpdate(this.managerForm.value).subscribe((manager: ManagerProfileDto) => {
        this.onCloseDrawer();
        this.user.next(manager);
      });
    }
  }

  onSendVerificationEmail(): void {
    this.authManagerService.sendVerificationEmail().subscribe(() => {
      this.notification.success('Verification code', 'Successfully sent to your email address.');
    });
  }

  onLogOut(): void {
    this.authenticationService.signOutAll();
  }

  selectSession(sessionId: string): void {
    this.selectedSession = sessionId;
    this.openPanel.next('SessionLogOut');
  }

  sessionLogOutCancel(): void {
    this.openPanel.next(null);
    this.selectedSession = null;
  }

  onSessionLogOut(): void {
    if (this.selectedSession) {
      this.authManagerService.sessionLogOut({ sessionId: this.selectedSession }).subscribe(() => {
        this.notification.success('Session Log Out.', `Session ${this.selectedSession} logged out.`);
        this.sessionsRefresh.next(true);
        this.openPanel.next(null);
        this.selectedSession = null;
      });
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { LangCodeEnum } from 'src/shared/api/data-contracts';
import { DeviceService } from 'src/shared/services/device.service';
import { GuestAuthenticationService } from 'src/shared/services/guest-authentication.service';
@Component({
  selector: 'ui-auth-signup-step-one',
  templateUrl: './auth-signup-step-one.component.html',
  styleUrls: ['./auth-signup-step-one.component.scss'],
})
export class AuthSignupStepOneComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
  pwd: string = '';
  confirmPwd: string = '';
  error_name: boolean = false;
  error_lastName: boolean = false;
  error_email: boolean = false;
  error_pwd: boolean = false;
  error_confirmPwd: boolean = false;
  errorCode: number | undefined;
  strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.{8,})');
  mediumPassword = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
  );

  strengthBadge: string = '';
  strengthBadgeStyle: string = '';
  loading: boolean = false;
  @Output() onContinueClick = new EventEmitter<Event>();
  private notifier: NotifierService;

  constructor(
    private readonly guestAuthenticationService: GuestAuthenticationService,
    private readonly deviceService: DeviceService,
    private ref: ChangeDetectorRef,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  init(): void {
    this.error_name = false;
    this.error_lastName = false;
    this.error_email = false;
    this.error_pwd = false;
    this.error_confirmPwd = false;
  }

  ValidateEmail(email: string): boolean {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    this.notifier.notify('warning', 'You have entered an invalid email address !');
    return false;
  }

  StrengthChecker(PasswordParameter: string): void {
    if (this.strongPassword.test(PasswordParameter)) {
      this.strengthBadge = 'Strong';
      this.strengthBadgeStyle = 'text-green';
    } else if (this.mediumPassword.test(PasswordParameter)) {
      this.strengthBadge = 'Medium';
      this.strengthBadgeStyle = 'text-yellow';
    } else {
      this.strengthBadge = 'Weak';
      this.strengthBadgeStyle = 'text-red';
    }
    if (PasswordParameter === '') {
      this.strengthBadge = '';
      this.strengthBadgeStyle = '';
    }
  }

  onBack(): void {
    window.location.href = '/login';
  }

  onEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.onContinue(event);
    }
  }

  onSetpassword(event: string): void {
    this.pwd = event;
    this.StrengthChecker(this.pwd);
  }

  onContinue(event: Event): void {
    this.init();
    if (this.name === '') {
      this.error_name = true;
    } else if (this.lastName === '') {
      this.error_lastName = true;
    } else if (this.email === '' || !this.ValidateEmail(this.email)) {
      this.error_email = true;
    } else if (this.pwd === '' || this.strengthBadge === 'Weak') {
      this.error_pwd = true;
    } else if (this.confirmPwd === '') {
      this.error_confirmPwd = true;
    } else {
      if (this.pwd !== this.confirmPwd) {
        this.error_pwd = true;
        this.error_confirmPwd = true;
      } else {
        this.loading = true;
        this.guestAuthenticationService
          .signUp('string', '1.0', this.name, this.lastName, this.email, this.pwd, this.confirmPwd, LangCodeEnum.EN, false)
          .then(
            () => {
              this.errorCode = 200;
              localStorage.setItem('email', this.email);
              this.loading = false;
              this.ref.detectChanges();
              this.onContinueClick.emit(event);
            },
            (error: number) => {
              this.errorCode = error;
              this.error_email = true;
              this.loading = false;
              this.ref.detectChanges();
              this.notifier.notify('error', 'This email is already registered !');
            },
          );
      }
    }
  }
}

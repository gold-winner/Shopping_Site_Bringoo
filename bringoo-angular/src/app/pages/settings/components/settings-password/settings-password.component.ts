import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { GuestAuthenticationService } from 'src/shared/services/guest-authentication.service';
@Component({
  selector: 'ui-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.scss'],
})
export class SettingsPasswordComponent {
  oldPwd: string = '';
  newPwd: string = '';
  confirmPwd: string = '';
  error_oldPwd: boolean = false;
  error_newPwd: boolean = false;
  error_confirmPwd: boolean = false;
  showConfirmPwd: boolean = false;
  showNewPwd: boolean = false;
  newPwdType: 'text' | 'password' = 'password';
  confirmPwdType: 'text' | 'password' = 'password';
  confirmed: boolean = false;
  errorCode: number | undefined;
  strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.{8,})');
  mediumPassword = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
  );

  notify: boolean = false;
  loading: boolean = false;
  strengthBadge: string = '';
  strengthBadgeStyle: string = '';
  private notifier: NotifierService;

  constructor(
    private readonly guestAuthenticationService: GuestAuthenticationService,
    private ref: ChangeDetectorRef,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  @ViewChild('notification') notification: ElementRef | undefined;

  init(): void {
    this.error_oldPwd = false;
    this.error_newPwd = false;
    this.error_confirmPwd = false;
  }

  onEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.onConfirmClick();
    }
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

  onChangeConfirmPwd(e: KeyboardEvent): void {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      this.onConfirmClick();
    }
    this.confirmPwd = (e.target as HTMLInputElement).value;
  }

  toggleOnConfirmPwd(): void {
    this.showConfirmPwd = !this.showConfirmPwd;
    if (this.showConfirmPwd) {
      this.confirmPwdType = 'text';
    } else {
      this.confirmPwdType = 'password';
    }
  }

  toggleOnNewPwd(): void {
    this.showNewPwd = !this.showNewPwd;
    if (this.showNewPwd) {
      this.newPwdType = 'text';
    } else {
      this.newPwdType = 'password';
    }
  }

  onSetpassword(e: KeyboardEvent): void {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      this.onConfirmClick();
    }
    this.newPwd = (e.target as HTMLInputElement).value;
    this.StrengthChecker(this.newPwd);
  }

  onConfirmClick(): void {
    this.init();
    if (this.oldPwd === '') {
      this.error_oldPwd = true;
    } else if (this.newPwd !== this.confirmPwd || this.newPwd === '') {
      this.error_newPwd = true;
      this.error_confirmPwd = true;
    } else {
      this.loading = true;
      this.guestAuthenticationService.changePassword(this.oldPwd, this.newPwd, this.confirmPwd).then(
        () => {
          this.loading = false;
          this.errorCode = 200;
          this.confirmed = true;
          this.oldPwd = '';
          this.newPwd = '';
          this.confirmPwd = '';
          this.notify = true;
          this.ref.detectChanges();
          this.notification?.nativeElement.classList.add('success--show');
          setTimeout(() => {
            this.confirmed = false;
            this.notification?.nativeElement.classList.remove('success--show');
          }, 3000);
        },
        (error: number) => {
          this.loading = false;
          this.notifier.notify('error', 'You have entered wrong old password !');
          this.errorCode = error;
          this.error_oldPwd = true;
          this.notify = false;
          this.ref.detectChanges();
        },
      );
    }
  }
}

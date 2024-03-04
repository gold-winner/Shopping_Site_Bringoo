import { Component, EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { GuestAuthenticationService } from 'src/shared/services/guest-authentication.service';
@Component({
  selector: 'ui-auth-forgot-pwd',
  templateUrl: './auth-forgot-pwd.component.html',
  styleUrls: ['./auth-forgot-pwd.component.scss'],
})
export class AuthForgotPwdComponent {
  email: string = '';
  error_email: boolean = false;
  errorCode: number | undefined;
  loading: boolean = false;
  @Output() onResetPwdClick = new EventEmitter<Event>();
  private notifier: NotifierService;

  constructor(
    private readonly guestAuthenticationService: GuestAuthenticationService,
    private ref: ChangeDetectorRef,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  init(): void {
    this.error_email = false;
  }

  onEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.onReset(event);
    }
  }

  ValidateEmail(email: string): boolean {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    this.notifier.notify('warning', 'You have entered an invalid email address !');
    return false;
  }

  onReset(event: Event): void {
    this.init();
    if (this.email === '' || !this.ValidateEmail(this.email)) {
      this.error_email = true;
    } else {
      this.loading = true;
      this.guestAuthenticationService.resetPassword(this.email).then(
        () => {
          this.loading = false;
          this.errorCode = 200;
          localStorage.setItem('email', this.email);
          this.onResetPwdClick.emit(event);
          this.ref.detectChanges();
        },
        (error: number) => {
          this.loading = false;
          this.errorCode = error;
          this.error_email = true;
          this.ref.detectChanges();
          this.notifier.notify('error', 'You have entered wrong email address !');
        },
      );
    }
  }
}

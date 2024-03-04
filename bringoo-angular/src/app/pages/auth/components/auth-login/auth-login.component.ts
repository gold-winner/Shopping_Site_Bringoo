import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { GuestAuthenticationService } from 'src/shared/services/guest-authentication.service';
@Component({
  selector: 'ui-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  email: string = '';
  pwd: string = '';
  error_email: boolean = false;
  error_pwd: boolean = false;
  errorCode: number | undefined;
  remember: boolean = false;
  loading: boolean = false;
  @Output() onForgotPwdClick = new EventEmitter<Event>();
  private notifier: NotifierService;

  constructor(
    private readonly guestAuthenticationService: GuestAuthenticationService,
    private ref: ChangeDetectorRef,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {}

  init(): void {
    this.error_email = false;
    this.error_pwd = false;
  }

  ValidateEmail(email: string): boolean {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    this.notifier.notify('warning', 'You have entered an invalid email address !');
    return false;
  }

  onEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.onLoginClick();
    }
  }

  onLoginClick(): void {
    this.ref.detectChanges();
    this.init();
    if (this.email === '' || !this.ValidateEmail(this.email)) {
      this.error_email = true;
    } else if (this.pwd === '') {
      this.error_pwd = true;
    } else {
      this.loading = true;
      this.guestAuthenticationService.signIn('string', '1.0', this.email, this.pwd, this.remember).then(
        () => {
          this.loading = false;
          this.errorCode = 200;
          this.ref.detectChanges();
        },
        (error: number) => {
          this.loading = false;
          this.errorCode = error;
          this.error_email = true;
          this.error_pwd = true;
          this.ref.detectChanges();
          this.notifier.notify('error', 'You have entered wrong email or password !');
        },
      );
    }
  }
}

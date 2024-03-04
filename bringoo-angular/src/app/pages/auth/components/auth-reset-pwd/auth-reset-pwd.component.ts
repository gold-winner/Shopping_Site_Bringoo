import { Component, EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { GuestAuthenticationService } from 'src/shared/services/guest-authentication.service';
@Component({
  selector: 'ui-auth-reset-pwd',
  templateUrl: './auth-reset-pwd.component.html',
  styleUrls: ['./auth-reset-pwd.component.scss'],
})
export class AuthResetPwdComponent {
  pwd: string = '';
  confirm_pwd: string = '';
  error_pwd: boolean = false;
  errorCode: number | undefined;
  myEmail: string | null = localStorage.getItem('email');
  loading: boolean = false;
  @Output() onConfirmClick = new EventEmitter<Event>();
  private notifier: NotifierService;

  constructor(
    private readonly guestAuthenticationService: GuestAuthenticationService,
    private ref: ChangeDetectorRef,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  init(): void {
    this.error_pwd = false;
  }

  onEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.onConfirm(event);
    }
  }

  onResend(): void {}

  onConfirm(event: Event): void {
    this.init();
    if (this.pwd === '') {
      this.error_pwd = true;
    } else {
      this.loading = true;
      this.guestAuthenticationService.setPassword(this.pwd, this.pwd).then(
        () => {
          this.loading = false;
          this.errorCode = 200;
          localStorage.removeItem('email');
          this.onConfirmClick.emit(event);
          this.ref.detectChanges();
        },
        (error: number) => {
          this.loading = false;
          this.errorCode = error;
          this.error_pwd = true;
          this.ref.detectChanges();
          this.notifier.notify('error', 'You have entered wrong password !');
        },
      );
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { GuestAuthenticationService } from 'src/shared/services/guest-authentication.service';
@Component({
  selector: 'ui-auth-signup-step-two',
  templateUrl: './auth-signup-step-two.component.html',
  styleUrls: ['./auth-signup-step-two.component.scss'],
})
export class AuthSignupStepTwoComponent {
  @Output() onBackClick = new EventEmitter<Event>();
  @Output() onVerify = new EventEmitter<Event>();
  digitCode: string[] = ['', '', '', ''];
  errors: boolean[] = [];
  notValidated: boolean = false;
  code: string = '';
  errorCode: number | undefined;
  myEmail: string | null = localStorage.getItem('email');
  loading: boolean = false;
  private notifier: NotifierService;
  constructor(
    private readonly guestAuthenticationService: GuestAuthenticationService,
    private ref: ChangeDetectorRef,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  onResend(): void {
    this.guestAuthenticationService.sendVerificationEmail();
    this.notifier.notify('success', 'We sent the 4 digit code to your email, Please check...');
  }

  onEnter(event: KeyboardEvent, digit: number): void {
    this.digitCode[digit] = (event.target as HTMLInputElement).value;
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.verify(event);
    } else {
      let element: any;
      if (event.code !== 'Backspace') element = event.target && (<HTMLInputElement>event.target).nextElementSibling;
      if (event.code === 'Backspace') element = event.target && (<HTMLInputElement>event.target).previousElementSibling;
      if (element === null) return;
      else (<HTMLInputElement>element).focus();
    }
  }

  verify(event: Event): void {
    this.code = '';
    this.notValidated = false;
    this.digitCode.map((digit: string, index: number) => {
      this.code += digit;
      if (digit === '') {
        this.errors[index] = true;
        this.notValidated = true;
      } else {
        this.errors[index] = false;
      }
    });
    this.loading = true;
    this.guestAuthenticationService.verifyEmail(this.code).then(
      () => {
        this.loading = false;
        this.errorCode = 200;
        localStorage.removeItem('email');
        this.onVerify.emit(event);
        this.ref.detectChanges();
      },
      (error: number) => {
        this.loading = false;
        this.errorCode = error;
        this.ref.detectChanges();
        this.notifier.notify('error', 'You have entered invalid code !');
        this.errors[0] = true;
        this.errors[1] = true;
        this.errors[2] = true;
        this.errors[3] = true;
      },
    );
  }
}

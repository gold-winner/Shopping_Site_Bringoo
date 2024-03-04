import { Component } from '@angular/core';

@Component({
  selector: 'ui-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export class AuthSignupComponent {
  currentStep: number = 1;
}

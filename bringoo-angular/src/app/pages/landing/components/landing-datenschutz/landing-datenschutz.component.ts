import { Component } from '@angular/core';

@Component({
  selector: 'ui-landing-datenschutz',
  templateUrl: './landing-datenschutz.component.html',
  styleUrls: ['./landing-datenschutz.component.scss'],
})
export class LandingDatenschutzComponent {
  pageStatus: 'login' | 'signup' | 'forgot-pwd' | 'reset-pwd' = 'login';
  signModal: boolean = false;
  year: number = new Date().getFullYear();

  SignIn(): void {
    this.signModal = true;
    this.pageStatus = 'login';
  }

  SignUp(): void {
    this.signModal = true;
    this.pageStatus = 'signup';
  }

  onSignModalClose(): void {
    this.signModal = false;
  }

  onClickAnalytics(): void {}
}

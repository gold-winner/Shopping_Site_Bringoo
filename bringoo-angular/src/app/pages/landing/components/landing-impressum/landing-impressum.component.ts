import { Component } from '@angular/core';

@Component({
  selector: 'ui-landing-impressum',
  templateUrl: './landing-impressum.component.html',
  styleUrls: ['./landing-impressum.component.scss'],
})
export class LandingImpressumComponent {
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
}

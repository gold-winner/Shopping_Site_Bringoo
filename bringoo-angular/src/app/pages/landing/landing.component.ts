import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';

export type landingCardType = {
  title: string;
  content: string;
  footer: string;
};
@Component({
  selector: 'ui-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  pageStatus: 'login' | 'signup' | 'forgot-pwd' | 'reset-pwd' = 'login';
  signModal: boolean = false;
  httpClient: HttpClient;
  mapLoaded: boolean = false;
  object: object | undefined;

  constructor(httpClient: HttpClient, private ref: ChangeDetectorRef) {
    this.httpClient = httpClient;
    httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDs_JyEVBPXVxUM_hIfOwmOlsq9NNAWZhY&libraries=places', 'callback')
      .subscribe((res: Object) => {
        this.object = res;
        this.mapLoaded = true;
      });
  }

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

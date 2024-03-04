import { Component, Input } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'ui-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  @Input() pageStatus: 'login' | 'signup' | 'forgot-pwd' | 'reset-pwd' = 'login';
  @Input() modal: boolean = false;
  constructor() {
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    const accessExpire: string | null = localStorage.getItem('accessExpire');
    const refreshExpire: string | null = localStorage.getItem('refreshExpire');
    if (Cookies.get('customerToken')) {
      window.location.href = '/store-selector';
    } else if (accessToken && refreshToken && accessExpire && refreshExpire) {
      Cookies.set('accessToken', accessToken, { expires: new Date(Number.parseInt(accessExpire)) });
      Cookies.set('refreshToken', refreshToken, { expires: new Date(Number.parseInt(refreshExpire)) });
      window.location.href = '/store-selector';
    }
  }
}

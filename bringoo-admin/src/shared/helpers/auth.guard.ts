import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Cookies from 'js-cookie';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly ngZone: NgZone) {}

  canActivate(): Observable<boolean> | boolean {
    const tokenExist: string = Cookies.get('accessToken') ?? Cookies.get('refreshToken') ?? '';

    if (!tokenExist) {
      this.ngZone.run(() => {
        this.router.navigate(['/auth/email']);
      });
      return false;
    }
    return true;
  }
}

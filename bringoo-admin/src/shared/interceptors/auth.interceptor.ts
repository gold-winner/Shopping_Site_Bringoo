import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, ObservableInput, of, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';

import { AuthManagerService } from '../api/auth/auth-manager.service';
import { InputError, TokensDto } from '../api/auth/data-contracts';
import { GET_TOKEN_URLS } from '../config/get-tokens-urls.config';
import { AuthenticationService } from '../services/authentication.service';
import { DeviceService } from '../services/device.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly notification: NzNotificationService,
    private readonly authManagerService: AuthManagerService,
    private readonly deviceService: DeviceService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === HttpStatusCode.Unauthorized) {
          if (this.isGetTokenUrl(req.url)) {
            this.authenticationService.goToAuthPage();
            return of();
          } else {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject.pipe(
                filter((result: string | null) => result !== null),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(req))),
              );
            } else {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);

              return this.authManagerService
                .refresh({
                  refreshToken: this.authenticationService.getRefreshToken() || '',
                  deviceId: this.deviceService.getDeviceInfo().deviceId,
                })
                .pipe(
                  switchMap(({ refreshToken, accessToken }: TokensDto) => {
                    this.authenticationService.saveTokens({ refreshToken, accessToken });
                    this.refreshTokenSubject.next(refreshToken);
                    return next.handle(this.addAuthenticationToken(req));
                  }),
                  finalize(() => (this.refreshTokenInProgress = false)),
                );
            }
          }
        } else {
          return this.onCatchError(error);
        }
      }),
    ) as Observable<HttpEvent<any>>;
  }

  private isGetTokenUrl(url: string): boolean {
    return GET_TOKEN_URLS.some((tokenRelativeUrl: string) => url.includes(tokenRelativeUrl));
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    return this.authenticationService.getAccessToken()
      ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.getAccessToken()}`) })
      : request;
  }

  private onCatchError(err: HttpErrorResponse): ObservableInput<any> {
    const notificationText: string =
      (err.status !== HttpStatusCode.BadRequest && err.status === HttpStatusCode.Unauthorized) || !Array.isArray(err.error.message)
        ? err.error.message
        : err.error.message.map(({ message, property }: InputError) => `${property}: ${message}`).join('\n');

    this.notification.create('error', 'Error', notificationText, {
      nzDuration: 10000,
      nzPlacement: 'bottomLeft',
    });

    return throwError(err);
  }
}

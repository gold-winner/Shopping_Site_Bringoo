import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, take } from 'rxjs/operators';
import { DeviceService } from 'src/shared/services/device.service';

import { AuthCustomer } from '../api/auth-customer';
import { LangCodeEnum, TokensDto } from '../api/data-contracts';
import { RefreshService } from './refresh.service';

export enum ManagerRoleEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  VENDOR = 'VENDOR',
  SUPPORT = 'SUPPORT',
}
export interface decodedToken {
  userId: string;
  role: ManagerRoleEnum;
  iat: number;
  exp: number;
}
export type RefreshTokenStatus = 'doRefresh' | 'refreshed' | 'cancel';

@Injectable({
  providedIn: 'root',
})
export class GuestAuthenticationService {
  // public userRole!: ManagerRoleEnum;
  private _userId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userId$: Observable<string | null> = this._userId.asObservable();

  refreshExpires: number = 0;
  accessExpires: number = 0;

  setRefreshToken(refreshToken?: string): void {
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken, { expires: new Date(this.refreshExpires) });
    } else {
      Cookies.remove('refreshToken');
    }
  }

  getRefreshToken(): string {
    return Cookies.get('refreshToken') ?? '';
  }

  setAccessToken(accessToken?: string): void {
    if (accessToken) {
      Cookies.set('accessToken', accessToken, { expires: new Date(this.accessExpires) });
    } else {
      Cookies.remove('accessToken');
    }
  }

  getAccessToken(): string {
    return Cookies.get('accessToken') ?? '';
  }

  setCustomerToken(customerToken?: string): void {
    if (customerToken) {
      Cookies.set('customerToken', customerToken, { expires: new Date(this.refreshExpires) });
    } else {
      Cookies.remove('customerToken');
    }
  }

  getCustomerToken(): string {
    return Cookies.get('customerToken') ?? '';
  }

  constructor(
    private readonly authCustomer: AuthCustomer,
    private readonly refreshService: RefreshService,
    private readonly deviceService: DeviceService,
    private readonly router: Router,
  ) {
    this.init();

    this.refreshService.refresh
      .asObservable()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((status: RefreshTokenStatus) => status === 'doRefresh'),
      )
      .subscribe(() => this.refreshTokens());
  }

  private init(): void {
    const accessToken: string = this.getAccessToken();
    const refreshToken: string = this.getRefreshToken();
    if (accessToken && refreshToken) {
      try {
        this.decodeTokens({ refreshToken, accessToken });
        this.refreshTokens();
      } catch {
        this.goToAuthPage();
      }
    } else {
      this.goToAuthPage();
    }
  }

  private refreshTokens(): void {
    const accessToken: string = this.getAccessToken();
    const refreshToken: string = this.getRefreshToken();
    const customerToken: string = this.getCustomerToken();
    if ((!accessToken && refreshToken) || this.refreshService.refresh.getValue() === 'doRefresh') {
      this.authCustomer.refresh({ refreshToken: this.getRefreshToken(), deviceId: this.deviceService.getDeviceInfo().deviceId }).subscribe(
        (tokens: TokensDto) => {
          if (customerToken) this.saveTokens(tokens, 'customer');
          else this.saveTokens(tokens, 'guest');
          this.refreshService.refresh.next('refreshed');
        },
        () => {
          this.goToAuthPage();
          this.refreshService.refresh.next('cancel');
        },
      );
      return;
    }
    if (!refreshToken) {
      this.goToAuthPage();
      this.refreshService.refresh.next('cancel');
    }
  }

  signIn(pushNotificationToken: string, appVersion: string, email: string, password: string, remember: boolean): Promise<number> {
    return new Promise((resolve: (value: number) => void, reject: (value: number) => void) => {
      const deviceInfo: Record<string, string> = this.deviceService.getDeviceInfo();
      this.authCustomer
        .signIn({
          deviceId: deviceInfo.deviceId,
          pushNotificationToken,
          deviceType: deviceInfo.deviceType,
          deviceName: deviceInfo.deviceName,
          deviceBrand: deviceInfo.deviceBrand,
          deviceOs: deviceInfo.deviceOs,
          appVersion,
          email,
          password,
        })
        .pipe(take(1))
        .subscribe(
          (tokens: TokensDto) => {
            localStorage.setItem('customerEmail', email);
            localStorage.setItem('customerAccessToken', JSON.stringify(tokens.accessToken));
            localStorage.setItem('customerRefreshToken', JSON.stringify(tokens.refreshToken));
            if (!remember) this.saveTokens(tokens, 'customer');
            else this.saveRememberTokens(tokens);
            this.router.navigate(['/store-selector']).then(() => window.location.reload());
            resolve(200);
          },
          (err: any) => {
            reject(err.status);
          },
        );
    });
  }

  sendVerificationEmail(): void {
    this.authCustomer.sendVerificationEmail().subscribe();
  }

  signUp(
    pushNotificationToken: string,
    appVersion: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    customerLanguageCode: LangCodeEnum,
    doNotVerifyEmail: boolean,
  ): Promise<number> {
    return new Promise((resolve: (value: number) => void, reject: (value: number) => void) => {
      const deviceInfo: Record<string, string> = this.deviceService.getDeviceInfo();
      this.authCustomer
        .signUp({
          pushNotificationToken,
          appVersion,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          customerLanguageCode,
          doNotVerifyEmail,
          deviceId: deviceInfo.deviceId,
          deviceType: deviceInfo.deviceType,
          deviceName: deviceInfo.deviceName,
          deviceBrand: deviceInfo.deviceBrand,
          deviceOs: deviceInfo.deviceOs,
        })
        .pipe(take(1))
        .subscribe(
          (tokens: TokensDto) => {
            localStorage.setItem('customerEmail', email);
            localStorage.setItem('customerAccessToken', JSON.stringify(tokens.accessToken));
            localStorage.setItem('customerRefreshToken', JSON.stringify(tokens.refreshToken));
            this.saveTokens(tokens, 'customer');
            // this.router.navigate(['/store-selector']).then(() => window.location.reload());
            resolve(200);
          },
          (err: any) => {
            reject(err.status);
          },
        );
    });
  }

  resetPassword(email: string): Promise<number> {
    return new Promise((resolve: (value: number) => void, reject: (value: number) => void) => {
      const deviceInfo: Record<string, string> = this.deviceService.getDeviceInfo();
      this.authCustomer.resetPassword({ email, deviceId: deviceInfo.deviceId }).subscribe(
        () => {
          resolve(200);
        },
        (err: any) => {
          reject(err.status);
        },
      );
    });
  }

  setPassword(pwd: string, confirm_pwd: string): Promise<number> {
    return new Promise((resolve: (value: number) => void, reject: (value: number) => void) => {
      this.authCustomer.setPassword({ password: pwd, confirmPassword: confirm_pwd }).subscribe(
        () => {
          resolve(200);
        },
        (err: any) => {
          reject(err.status);
        },
      );
    });
  }

  changePassword(oldPassword: string, password: string, confirmPassword: string): Promise<number> {
    return new Promise((resolve: (value: number) => void, reject: (value: number) => void) => {
      this.authCustomer.changePassword({ oldPassword, password, confirmPassword }).subscribe(
        () => {
          resolve(200);
        },
        (err: any) => {
          reject(err.status);
        },
      );
    });
  }

  verifyEmail(code: string): Promise<number> {
    return new Promise((resolve: (value: number) => void, reject: (value: number) => void) => {
      this.authCustomer.verifyEmail({ code }).subscribe(
        () => {
          resolve(200);
        },
        (err: any) => {
          reject(err.status);
        },
      );
    });
  }

  signOut(): void {
    this.authCustomer
      .signOut({ refreshToken: this.getRefreshToken(), deviceId: this.deviceService.getDeviceInfo().deviceId })
      .subscribe(() => {
        this.goToAuthPage();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessExpire');
        localStorage.removeItem('refreshExpire');
        localStorage.removeItem('customerAccessToken');
        localStorage.removeItem('customerRefreshToken');
        localStorage.removeItem('customerEmail');
      });
  }

  signOutAll(): void {
    this.authCustomer.signOutAll().subscribe(() => this.goToAuthPage());
  }

  goToAuthPage(): void {
    this.setRefreshToken();
    this.setAccessToken();
    this.setCustomerToken();
    this.authCustomer
      .guestSignUp({ deviceId: this.deviceService.getDeviceInfo().deviceId, customerLanguageCode: LangCodeEnum.DE })
      .subscribe((tokens: TokensDto) => {
        this.saveTokens(tokens, 'guest');
        this.refreshService.refresh.next('refreshed');
      });
    this._userId.next(null);
    this.router.navigate(['landing']);
  }

  private saveTokens({ refreshToken, accessToken }: TokensDto, type: string): void {
    this.decodeTokens({ refreshToken, accessToken });
    this.setRefreshToken(refreshToken);
    this.setAccessToken(accessToken);
    if (type === 'customer') {
      this.setCustomerToken(refreshToken);
    }
  }

  private saveRememberTokens({ refreshToken, accessToken }: TokensDto): void {
    this.decodeTokens({ refreshToken, accessToken });
    this.setRefreshToken(refreshToken);
    this.setAccessToken(accessToken);
    this.setCustomerToken(refreshToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('accessExpire', `${this.accessExpires}`);
    localStorage.setItem('refreshExpire', `${this.refreshExpires}`);
  }

  private decodeTokens({ refreshToken, accessToken }: TokensDto): void {
    const accessDecoded: decodedToken = jwtDecode(accessToken) as decodedToken;
    const refreshDecoded: decodedToken = jwtDecode(refreshToken) as decodedToken;

    // this.userRole = ManagerRoleEnum[accessDecoded.role];
    this._userId.next(accessDecoded.userId);

    this.refreshExpires = refreshDecoded.exp * 1000;
    this.accessExpires = accessDecoded.exp * 1000;
  }
}

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthManagerService } from '../api/auth/auth-manager.service';
import { TokensDto } from '../api/auth/data-contracts';
import { decodedToken } from '../interfaces/decoded-token';
import { DeviceService } from './device.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userRole!: string;
  public userId$: Observable<string | null> = this.userIdSubject.asObservable();

  expiresRefreshToken: Date | null = null;
  expiresAccessToken: Date | null = null;

  constructor(
    private readonly authManagerService: AuthManagerService,
    private readonly deviceService: DeviceService,
    private readonly router: Router,
    private readonly navigationService: NavigationService,
    private readonly ngZone: NgZone,
  ) {
    this.init();
  }

  setRefreshToken(refreshToken: string): void {
    Cookies.set('refreshToken', refreshToken, { ...(this.expiresRefreshToken && { expires: this.expiresRefreshToken }) });
  }

  getRefreshToken(): string | undefined {
    return Cookies.get('refreshToken');
  }

  removeRefreshToken(): void {
    Cookies.remove('refreshToken');
  }

  setAccessToken(accessToken: string): void {
    Cookies.set('accessToken', accessToken, { ...(this.expiresAccessToken && { expires: this.expiresAccessToken }) });
  }

  getAccessToken(): string | undefined {
    return Cookies.get('accessToken');
  }

  removeAccessToken(): void {
    Cookies.remove('accessToken');
  }

  init(): void {
    const accessToken: string | undefined = this.getAccessToken();
    const refreshToken: string | undefined = this.getRefreshToken();

    if (accessToken && refreshToken) {
      try {
        this.decodeTokens({ refreshToken, accessToken });
      } catch {
        this.goToAuthPage();
      }
    } else {
      if (!refreshToken) {
        this.goToAuthPage();
      }
    }
  }

  signIn(email: string, password: string, pushNotificationToken: string | null): void {
    const deviceInfo: Record<string, string> = this.deviceService.getDeviceInfo();

    this.authManagerService
      .signIn({
        email,
        password,
        deviceId: deviceInfo.deviceId,
        deviceType: deviceInfo.deviceType,
        deviceName: deviceInfo.deviceName,
        deviceBrand: deviceInfo.deviceBrand,
        deviceOs: deviceInfo.deviceOs,
        ...(pushNotificationToken && { pushNotificationToken }),
      })
      .subscribe((tokens: TokensDto) => {
        this.saveTokens(tokens);
        this.navigationService.navigationAfterAuth();
      });
  }

  signOut(): void {
    const refreshToken: string | undefined = this.getRefreshToken();
    const deviceId: string = this.deviceService.getDeviceInfo().deviceId;

    if (!refreshToken) {
      return;
    }

    this.authManagerService
      .signOut({ refreshToken, deviceId })
      .pipe(
        tap(() => {
          this.removeAccessToken();
          this.removeRefreshToken();
        }),
      )
      .subscribe(() => this.goToAuthPage());
  }

  refresh(refreshToken: string): void {
    const deviceInfo: Record<string, string> = this.deviceService.getDeviceInfo();
    this.authManagerService.refresh({ refreshToken, deviceId: deviceInfo.deviceId }).subscribe((tokens: TokensDto) => {
      this.decodeTokens(tokens);
    });
  }

  signOutAll(): void {
    this.authManagerService
      .signOutAll()
      .pipe(
        tap(() => {
          this.removeAccessToken();
          this.removeRefreshToken();
        }),
      )
      .subscribe(() => this.goToAuthPage());
  }

  goToAuthPage(): void {
    this.userIdSubject.next(null);
    this.ngZone.run(() => this.router.navigate(['auth']));
  }

  saveTokens({ refreshToken, accessToken }: TokensDto): void {
    this.decodeTokens({ refreshToken, accessToken });
    this.setRefreshToken(refreshToken);
    this.setAccessToken(accessToken);
  }

  private decodeTokens({ refreshToken, accessToken }: TokensDto): void {
    const refreshDecoded: decodedToken = jwtDecode<decodedToken>(refreshToken);
    const accessDecoded: decodedToken = jwtDecode<decodedToken>(accessToken);

    this.expiresRefreshToken = new Date(refreshDecoded.exp * 1000);
    this.expiresAccessToken = new Date(accessDecoded.exp * 1000);

    this.userRole = accessDecoded.role;
    this.userIdSubject.next(accessDecoded.userId);
  }
}

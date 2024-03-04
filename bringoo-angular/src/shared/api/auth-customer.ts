import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  ChangePasswordInput,
  CustomerSignInInput,
  CustomerSignUpInput,
  EmailVerifyInput,
  GuestSignUpInput,
  Object,
  RefreshTokenInput,
  ResetPasswordInput,
  SetPasswordInput,
  SmsCheckCodeVerificationInput,
  TokensDto,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AuthCustomer extends ApiDefaultService {
  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerGuestSignUp
   * @summary SignUp as guest.
   * @request POST:/auth-customer/guest-sign-up
   * @response `201` `TokensDto`
   */
  guestSignUp = (data: GuestSignUpInput): Observable<TokensDto> =>
    this.request<TokensDto, GuestSignUpInput>(`/auth-customer/guest-sign-up`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerSignUp
   * @summary SignUp customer account.
   * @request POST:/auth-customer/sign-up
   * @secure
   * @response `201` `TokensDto`
   */
  signUp = (data: CustomerSignUpInput): Observable<TokensDto> =>
    this.request<TokensDto, CustomerSignUpInput>(`/auth-customer/sign-up`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerSendVerificationEmail
   * @summary Send a verification email.
   * @request POST:/auth-customer/send-verification-email
   * @secure
   * @response `201` `boolean`
   */
  sendVerificationEmail = (data?: Object): Observable<boolean> =>
    this.request<boolean, Object>(`/auth-customer/send-verification-email`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerSignIn
   * @summary SignIn in customer account.
   * @request POST:/auth-customer/sign-in
   * @secure
   * @response `201` `TokensDto`
   */
  signIn = (data: CustomerSignInInput): Observable<TokensDto> =>
    this.request<TokensDto, CustomerSignInInput>(`/auth-customer/sign-in`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerSignOut
   * @summary SignOut from customer account.
   * @request POST:/auth-customer/sign-out
   * @secure
   * @response `201` `boolean`
   */
  signOut = (data: RefreshTokenInput): Observable<boolean> =>
    this.request<boolean, RefreshTokenInput>(`/auth-customer/sign-out`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerSignOutAll
   * @summary SignOut from all session for this customer.
   * @request POST:/auth-customer/sign-out-all
   * @secure
   * @response `201` `number`
   */
  signOutAll = (data?: Object): Observable<number> => this.request<number, Object>(`/auth-customer/sign-out-all`, 'POST', data);
  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerVerifyEmail
   * @summary Get verify code from email.
   * @request POST:/auth-customer/verify-email
   * @secure
   * @response `201` `boolean`
   */
  verifyEmail = (data: EmailVerifyInput): Observable<boolean> =>
    this.request<boolean, EmailVerifyInput>(`/auth-customer/verify-email`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerRefresh
   * @summary Refresh JWT tokens.
   * @request POST:/auth-customer/refresh
   * @response `201` `TokensDto`
   */
  refresh = (data: RefreshTokenInput): Observable<TokensDto> =>
    this.request<TokensDto, RefreshTokenInput>(`/auth-customer/refresh`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerResetPassword
   * @summary Reset customer password. Send Email.
   * @request POST:/auth-customer/reset-password
   * @secure
   * @response `201` `boolean`
   */
  resetPassword = (data: ResetPasswordInput): Observable<boolean> =>
    this.request<boolean, ResetPasswordInput>(`/auth-customer/reset-password`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerSetPassword
   * @summary Set customer password.
   * @request POST:/auth-customer/set-password
   * @secure
   * @response `201` `boolean`
   */
  setPassword = (data: SetPasswordInput): Observable<boolean> =>
    this.request<boolean, SetPasswordInput>(`/auth-customer/set-password`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerChangePassword
   * @summary Change customer password.
   * @request POST:/auth-customer/change-password
   * @secure
   * @response `201` `boolean`
   */
  changePassword = (data: ChangePasswordInput): Observable<boolean> =>
    this.request<boolean, ChangePasswordInput>(`/auth-customer/change-password`, 'POST', data);

  /**
   * No description
   *
   * @tags auth-customer
   * @name AuthCustomerControllerCheckVerificationCodeFromSms
   * @summary Check a verification code from sms and verify phone number.
   * @request POST:/auth-customer/check-verification-code-from-sms
   * @secure
   * @response `201` `boolean`
   */
  checkVerificationCodeFromSms = (data: SmsCheckCodeVerificationInput): Observable<boolean> =>
    this.request<boolean, SmsCheckCodeVerificationInput>(`/auth-customer/check-verification-code-from-sms`, 'POST', data);
}

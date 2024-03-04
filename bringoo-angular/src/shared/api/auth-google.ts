import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { AccessTokenDto, AuthGoogleControllerSignUpParams, BaseSignInput, TokensDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogle extends ApiDefaultService {
  /**
   * No description
   *
   * @tags auth-google
   * @name AuthGoogleControllerGoogleAuth
   * @request GET:/auth-google
   * @response `200` `string`
   */
  googleAuth = (): Observable<string> => this.request<string, any>(`/auth-google`, 'GET');
  /**
   * No description
   *
   * @tags auth-google
   * @name AuthGoogleControllerGoogleAuthRedirect
   * @request GET:/auth-google/redirect
   * @response `200` `AccessTokenDto`
   */
  googleAuthRedirect = (): Observable<AccessTokenDto> => this.request<AccessTokenDto, any>(`/auth-google/redirect`, 'GET');
  /**
   * No description
   *
   * @tags auth-google
   * @name AuthGoogleControllerSignUp
   * @summary SignUp/SignIn with google token
   * @request POST:/auth-google/login
   * @secure
   * @response `201` `TokensDto`
   */
  signUp = (query: AuthGoogleControllerSignUpParams, data: BaseSignInput): Observable<TokensDto> =>
    this.request<TokensDto, BaseSignInput>(`/auth-google/login`, 'POST', data, query);
}

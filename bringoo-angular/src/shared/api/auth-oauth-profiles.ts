import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { OauthProfileDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AuthOauthProfiles extends ApiDefaultService {
  /**
   * No description
   *
   * @tags auth-oauth-profiles
   * @name AuthOauthProfilesControllerGetCustomerOauthProfiles
   * @request GET:/auth-oauth-profiles
   * @secure
   * @response `200` `(OauthProfileDto)[]`
   */
  getCustomerOauthProfiles = (): Observable<OauthProfileDto[]> => this.request<OauthProfileDto[], any>(`/auth-oauth-profiles`, 'GET');
  /**
   * No description
   *
   * @tags auth-oauth-profiles
   * @name AuthOauthProfilesControllerDeleteAll
   * @request DELETE:/auth-oauth-profiles
   * @secure
   * @response `200` `boolean`
   */
  deleteAll = (): Observable<boolean> => this.request<boolean, any>(`/auth-oauth-profiles`, 'DELETE');
  /**
   * No description
   *
   * @tags auth-oauth-profiles
   * @name AuthOauthProfilesControllerDeleteProfile
   * @request DELETE:/auth-oauth-profiles/{id}
   * @secure
   * @response `200` `boolean`
   */
  deleteProfile = (id: string): Observable<boolean> => this.request<boolean, any>(`/auth-oauth-profiles/${id}`, 'DELETE');
}

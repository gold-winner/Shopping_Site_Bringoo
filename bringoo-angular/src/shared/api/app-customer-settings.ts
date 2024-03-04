import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { OsEnum, SettingsVersionStateDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerSettings extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-settings
   * @name AppCustomerSettingsControllerCompareVersionWithClient
   * @summary Compare Customer OS Version with client version
   * @request GET:/app-customer-settings/version/{os}/{clientVersion}
   * @secure
   * @response `200` `SettingsVersionStateDto`
   */
  compareVersionWithClient = (os: OsEnum, clientVersion: string): Observable<SettingsVersionStateDto> =>
    this.request<SettingsVersionStateDto, any>(`/app-customer-settings/version/${os}/${clientVersion}`, 'GET');
}

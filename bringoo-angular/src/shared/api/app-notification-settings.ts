import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { NotificationSettingsDto, NotificationSettingsInput } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppNotificationSettings extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-notification-settings
   * @name AppNotificationSettingsControllerGetNotificationSettings
   * @summary Get notification settings
   * @request GET:/app-notification-settings
   * @secure
   * @response `200` `NotificationSettingsDto`
   */
  getNotificationSettings = (): Observable<NotificationSettingsDto> =>
    this.request<NotificationSettingsDto, any>(`/app-notification-settings`, 'GET');

  /**
   * No description
   *
   * @tags app-notification-settings
   * @name AppNotificationSettingsControllerUpdateNotificationSettings
   * @summary Update notification settings
   * @request PATCH:/app-notification-settings
   * @secure
   * @response `200` `NotificationSettingsDto`
   */
  updateNotificationSettings = (data: NotificationSettingsInput): Observable<NotificationSettingsDto> =>
    this.request<NotificationSettingsDto, NotificationSettingsInput>(`/app-notification-settings`, 'PATCH', data);
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  AppCustomerPushNotificationControllerGetHistoriesByCustomerParams,
  Object,
  PushNotificationHistoryDto,
  PushNotificationHistoryMarkInput,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerPushNotification extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-push-notification
   * @name AppCustomerPushNotificationControllerGetHistoriesByCustomer
   * @summary Get customer push notifications
   * @request GET:/app-customer-push-notification
   * @secure
   * @response `200` `(PushNotificationHistoryDto)[]`
   */
  getHistoriesByCustomer = (
    query: AppCustomerPushNotificationControllerGetHistoriesByCustomerParams,
  ): Observable<PushNotificationHistoryDto[]> =>
    this.request<PushNotificationHistoryDto[], any>(`/app-customer-push-notification`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-customer-push-notification
   * @name AppCustomerPushNotificationControllerMarkHistoriesAsReadedByCustomer
   * @summary Mark certain customer push notifications as readed
   * @request PATCH:/app-customer-push-notification/mark-read
   * @secure
   * @response `200` `number`
   */
  markHistoriesAsReadedByCustomer = (data: PushNotificationHistoryMarkInput): Observable<number> =>
    this.request<number, PushNotificationHistoryMarkInput>(`/app-customer-push-notification/mark-read`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-customer-push-notification
   * @name AppCustomerPushNotificationControllerMarkAllHistoriesAsReadedByCustomer
   * @summary Mark all customer push notifications as readed
   * @request PATCH:/app-customer-push-notification/mark-read-all
   * @secure
   * @response `200` `number`
   */
  markAllHistoriesAsReadedByCustomer = (data?: Object): Observable<number> =>
    this.request<number, Object>(`/app-customer-push-notification/mark-read-all`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-customer-push-notification
   * @name AppCustomerPushNotificationControllerMarkHistoriesAsDeletedByCustomer
   * @summary Mark certain customer push notifications as deleted
   * @request PATCH:/app-customer-push-notification/mark-delete
   * @secure
   * @response `200` `number`
   */
  markHistoriesAsDeletedByCustomer = (data: PushNotificationHistoryMarkInput): Observable<number> =>
    this.request<number, PushNotificationHistoryMarkInput>(`/app-customer-push-notification/mark-delete`, 'PATCH', data);
}

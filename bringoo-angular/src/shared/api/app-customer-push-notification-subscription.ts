import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { PushNotificationSubscriptionEntity, PushNotificationSubscriptionRefreshInput } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerPushNotificationSubscription extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-push-notification-subscription
   * @name AppCustomerPushNotificationSubscriptionControllerGetSubscription
   * @summary Get push notification subscription by deviceId
   * @request GET:/app-customer-push-notification-subscription/by-device-id/{deviceId}
   * @secure
   * @response `200` `PushNotificationSubscriptionEntity`
   */
  getSubscription = (deviceId: string): Observable<PushNotificationSubscriptionEntity> =>
    this.request<PushNotificationSubscriptionEntity, any>(`/app-customer-push-notification-subscription/by-device-id/${deviceId}`, 'GET');

  /**
   * No description
   *
   * @tags app-customer-push-notification-subscription
   * @name AppCustomerPushNotificationSubscriptionControllerGetSubscriptions
   * @summary Get push notification subscription by deviceId
   * @request GET:/app-customer-push-notification-subscription/all
   * @secure
   * @response `200` `(PushNotificationSubscriptionEntity)[]`
   */
  getSubscriptions = (): Observable<PushNotificationSubscriptionEntity[]> =>
    this.request<PushNotificationSubscriptionEntity[], any>(`/app-customer-push-notification-subscription/all`, 'GET');

  /**
   * No description
   *
   * @tags app-customer-push-notification-subscription
   * @name AppCustomerPushNotificationSubscriptionControllerRefreshSubscription
   * @summary Refresh push notification subscription
   * @request POST:/app-customer-push-notification-subscription/refresh
   * @secure
   * @response `200` `boolean`
   */
  refreshSubscription = (data: PushNotificationSubscriptionRefreshInput): Observable<boolean> =>
    this.request<boolean, PushNotificationSubscriptionRefreshInput>(`/app-customer-push-notification-subscription/refresh`, 'POST', data);
}

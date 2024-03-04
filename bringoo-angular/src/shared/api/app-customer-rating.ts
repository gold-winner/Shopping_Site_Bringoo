import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { OsEnum, RatingAppPostponementCreateInput, RatingAppSetInput } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerRating extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-rating
   * @name AppCustomerRatingControllerGetCustomerRating
   * @summary Rating of app from customer.
   * @request GET:/app-customer-rating/app/{deviceOs}
   * @secure
   * @response `200` `number`
   */
  getCustomerRating = (deviceOs: OsEnum): Observable<number> => this.request<number, any>(`/app-customer-rating/app/${deviceOs}`, 'GET');
  /**
   * No description
   *
   * @tags app-customer-rating
   * @name AppCustomerRatingControllerSetCustomerRating
   * @summary Set rating of app from customer.
   * @request POST:/app-customer-rating/app
   * @secure
   * @response `200` `number`
   */
  setCustomerRating = (data: RatingAppSetInput): Observable<number> =>
    this.request<number, RatingAppSetInput>(`/app-customer-rating/app`, 'POST', data);

  /**
   * No description
   *
   * @tags app-customer-rating
   * @name AppCustomerRatingControllerPostponeCustomerRating
   * @summary Postpone rating of app from customer.
   * @request POST:/app-customer-rating/postpone
   * @secure
   * @response `200` `boolean`
   */
  postponeCustomerRating = (data: RatingAppPostponementCreateInput): Observable<boolean> =>
    this.request<boolean, RatingAppPostponementCreateInput>(`/app-customer-rating/postpone`, 'POST', data);

  /**
   * No description
   *
   * @tags app-customer-rating
   * @name AppCustomerRatingControllerNeedAskCustomerForRating
   * @summary Is customer needed to ask for rating of app.
   * @request GET:/app-customer-rating/need-ask-for-rating/{deviceOs}
   * @secure
   * @response `200` `boolean`
   */
  needAskCustomerForRating = (deviceOs: OsEnum): Observable<boolean> =>
    this.request<boolean, any>(`/app-customer-rating/need-ask-for-rating/${deviceOs}`, 'GET');
}

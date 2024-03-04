import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { FaqTopicDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerFaq extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-faq
   * @name AppCustomerFaqControllerGetTopicsWithItems
   * @summary Get topics with items.
   * @request GET:/app-customer-faq/topics-with-items
   * @secure
   * @response `200` `(FaqTopicDto)[]`
   */
  getTopicsWithItems = (): Observable<FaqTopicDto[]> => this.request<FaqTopicDto[], any>(`/app-customer-faq/topics-with-items`, 'GET');
}

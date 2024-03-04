import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { AppOrderControllerActiveParams, PageableActiveOrderDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppOrder extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-order
   * @name AppOrderControllerActive
   * @summary Get Active customer orders
   * @request GET:/app-order/active
   * @secure
   * @response `200` `PageableActiveOrderDto`
   */
  active = (query: AppOrderControllerActiveParams): Observable<PageableActiveOrderDto> =>
    this.request<PageableActiveOrderDto, any>(`/app-order/active`, 'GET', null, query);
}

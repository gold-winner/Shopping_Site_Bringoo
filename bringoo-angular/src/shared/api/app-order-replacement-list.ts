import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { OrderReplacementDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppOrderReplacementList extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-order-replacement-list
   * @name AppOrderReplacementListControllerGetOrderReplacementById
   * @summary Get order replacement by id
   * @request GET:/app-order-replacement-list/{orderReplacementId}
   * @secure
   * @response `200` `OrderReplacementDto`
   */
  getOrderReplacementById = (orderReplacementId: string): Observable<OrderReplacementDto> =>
    this.request<OrderReplacementDto, any>(`/app-order-replacement-list/${orderReplacementId}`, 'GET');
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { OrderVoucherDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerOrderVoucher extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-order-voucher
   * @name AppCustomerOrderVoucherControllerGetOrderVoucherByOrderId
   * @summary Get order voucher
   * @request GET:/app-customer-order-voucher/by-order/{orderId}
   * @secure
   * @response `200` `OrderVoucherDto`
   */
  getOrderVoucherByOrderId = (orderId: string): Observable<OrderVoucherDto> =>
    this.request<OrderVoucherDto, any>(`/app-customer-order-voucher/by-order/${orderId}`, 'GET');
}

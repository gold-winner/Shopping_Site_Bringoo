import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { ApplyCartVoucherInput, CartVoucherDto, VoucherApplyTryDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerCartVoucher extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-cart-voucher
   * @name AppCustomerCartVoucherControllerGetCartVoucherByOrderId
   * @summary Get voucher by cart id
   * @request GET:/app-customer-cart-voucher/by-cart/{cartId}
   * @secure
   * @response `200` `CartVoucherDto`
   */
  getCartVoucherByOrderId = (cartId: string): Observable<CartVoucherDto> =>
    this.request<CartVoucherDto, any>(`/app-customer-cart-voucher/by-cart/${cartId}`, 'GET');

  /**
   * No description
   *
   * @tags app-customer-cart-voucher
   * @name AppCustomerCartVoucherControllerDeleteVoucherByCartId
   * @summary Delete cart voucher by cart id
   * @request DELETE:/app-customer-cart-voucher/by-cart/{cartId}
   * @secure
   * @response `200` `boolean`
   */
  deleteVoucherByCartId = (cartId: string): Observable<boolean> =>
    this.request<boolean, any>(`/app-customer-cart-voucher/by-cart/${cartId}`, 'DELETE');

  /**
   * No description
   *
   * @tags app-customer-cart-voucher
   * @name AppCustomerCartVoucherControllerApplyVoucher
   * @summary Apply voucher to cart.
   * @request PATCH:/app-customer-cart-voucher/apply
   * @secure
   * @response `200` `VoucherApplyTryDto`
   */
  applyVoucher = (data: ApplyCartVoucherInput): Observable<VoucherApplyTryDto> =>
    this.request<VoucherApplyTryDto, ApplyCartVoucherInput>(`/app-customer-cart-voucher/apply`, 'PATCH', data);
}

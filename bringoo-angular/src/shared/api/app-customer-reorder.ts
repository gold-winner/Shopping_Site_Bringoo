import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { CartDto, CreateCartFromOrderInput } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerReorder extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-reorder
   * @name AppCustomerReorderControllerCreateCartFromOrder
   * @summary Create a cart from the closed order
   * @request POST:/app-customer-reorder/create-cart-from-order
   * @secure
   * @response `200` `CartDto`
   */
  createCartFromOrder = (data: CreateCartFromOrderInput): Observable<CartDto> =>
    this.request<CartDto, CreateCartFromOrderInput>(`/app-customer-reorder/create-cart-from-order`, 'POST', data);
}

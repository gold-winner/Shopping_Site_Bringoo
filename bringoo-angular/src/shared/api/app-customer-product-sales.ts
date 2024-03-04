import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { AppCustomerProductSalesControllerProductSalesParams, PageableProductSaleDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerProductSales extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-product-sales
   * @name AppCustomerProductSalesControllerProductSales
   * @summary Search of product sales
   * @request GET:/app-customer-product-sales
   * @secure
   * @response `200` `PageableProductSaleDto`
   */
  productSales = (query: AppCustomerProductSalesControllerProductSalesParams): Observable<PageableProductSaleDto> =>
    this.request<PageableProductSaleDto, any>(`/app-customer-product-sales`, 'GET', null, query);
}

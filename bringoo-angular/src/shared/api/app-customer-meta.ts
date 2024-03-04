import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { AppCustomerMetaControllerProductLegalParams, ProductLegalDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerMeta extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-meta
   * @name AppCustomerMetaControllerProductLegal
   * @summary Get Product Legal info
   * @request GET:/app-customer-meta/product-legal
   * @secure
   * @response `200` `ProductLegalDto`
   */
  productLegal = (query: AppCustomerMetaControllerProductLegalParams): Observable<ProductLegalDto> =>
    this.request<ProductLegalDto, any>(`/app-customer-meta/product-legal`, 'GET', null, query);
}

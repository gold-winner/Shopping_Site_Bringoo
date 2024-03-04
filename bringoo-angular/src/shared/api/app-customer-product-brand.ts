import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { AppCustomerProductBrandControllerProductBrandsParams, PageableProductBandDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerProductBrand extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-product-brand
   * @name AppCustomerProductBrandControllerProductBrands
   * @summary Search of product brands
   * @request GET:/app-customer-product-brand/product-brands
   * @secure
   * @response `200` `PageableProductBandDto`
   */
  productBrands = (query: AppCustomerProductBrandControllerProductBrandsParams): Observable<PageableProductBandDto> =>
    this.request<PageableProductBandDto, any>(`/app-customer-product-brand/product-brands`, 'GET', null, query);
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  AppCustomerProductRecallControllerGetProductRecallsByStoreParams,
  AppCustomerProductRecallControllerGetProductRecallsParams,
  Pageable,
  ProductRecallDetailDto,
  ProductRecallDto,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerProductRecall extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-product-recall
   * @name AppCustomerProductRecallControllerGetProductRecalls
   * @summary Get product recalls.
   * @request GET:/app-customer-product-recall
   * @secure
   * @response `200` `(Pageable & { items?: (ProductRecallDto)[] })`
   */
  getProductRecalls = (
    query: AppCustomerProductRecallControllerGetProductRecallsParams,
  ): Observable<Pageable & { items?: ProductRecallDto[] }> =>
    this.request<Pageable & { items?: ProductRecallDto[] }, any>(`/app-customer-product-recall`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-customer-product-recall
   * @name AppCustomerProductRecallControllerGetProductRecallsByStore
   * @summary Get product recalls from the store
   * @request GET:/app-customer-product-recall/by-store
   * @secure
   * @response `200` `(Pageable & { items?: (ProductRecallDto)[] })`
   */
  getProductRecallsByStore = (
    query: AppCustomerProductRecallControllerGetProductRecallsByStoreParams,
  ): Observable<Pageable & { items?: ProductRecallDto[] }> =>
    this.request<Pageable & { items?: ProductRecallDto[] }, any>(`/app-customer-product-recall/by-store`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-customer-product-recall
   * @name AppCustomerProductRecallControllerGetProductRecallById
   * @summary Get product recall by id.
   * @request GET:/app-customer-product-recall/{id}
   * @secure
   * @response `200` `ProductRecallDetailDto`
   */
  getProductRecallById = (id: string): Observable<ProductRecallDetailDto> =>
    this.request<ProductRecallDetailDto, any>(`/app-customer-product-recall/${id}`, 'GET');
}

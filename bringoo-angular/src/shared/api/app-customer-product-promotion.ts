import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  AppCustomerProductPromotionControllerGetProductPromotionsByStoreParams,
  AppCustomerProductPromotionControllerGetProductPromotionsDetailByStoreParams,
  Pageable,
  ProductPromotionDetailsDto,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerProductPromotion extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-product-promotion
   * @name AppCustomerProductPromotionControllerGetProductPromotionsByStore
   * @summary Get product promotion from the store
   * @request GET:/app-customer-product-promotion/by-store
   * @secure
   * @response `200` `(Pageable & { items?: (ProductPromotionDetailsDto)[] })`
   */
  getProductPromotionsByStore = (
    query: AppCustomerProductPromotionControllerGetProductPromotionsByStoreParams,
  ): Observable<Pageable & { items?: ProductPromotionDetailsDto[] }> =>
    this.request<Pageable & { items?: ProductPromotionDetailsDto[] }, any>(`/app-customer-product-promotion/by-store`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-customer-product-promotion
   * @name AppCustomerProductPromotionControllerGetProductPromotionsDetailByStore
   * @summary Get product promotion from the store
   * @request GET:/app-customer-product-promotion/by-store/detail
   * @secure
   * @response `200` `(Pageable & { items?: (ProductPromotionDetailsDto)[] })`
   */
  getProductPromotionsDetailByStore = (
    query: AppCustomerProductPromotionControllerGetProductPromotionsDetailByStoreParams,
  ): Observable<Pageable & { items?: ProductPromotionDetailsDto[] }> =>
    this.request<Pageable & { items?: ProductPromotionDetailsDto[] }, any>(
      `/app-customer-product-promotion/by-store/detail`,
      'GET',
      null,
      query,
    );

  /**
   * No description
   *
   * @tags app-customer-product-promotion
   * @name AppCustomerProductPromotionControllerGetProductPromotionDetailById
   * @summary Get product promotion by id
   * @request GET:/app-customer-product-promotion/{id}
   * @secure
   * @response `200` `ProductPromotionDetailsDto`
   */
  getProductPromotionDetailById = (id: string): Observable<ProductPromotionDetailsDto> =>
    this.request<ProductPromotionDetailsDto, any>(`/app-customer-product-promotion/${id}`, 'GET');
}

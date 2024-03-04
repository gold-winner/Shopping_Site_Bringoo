import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  AppCustomerProductRecommendationControllerGetProductRecommendationsByStoreParams,
  AppCustomerProductRecommendationControllerGetProductRecommendationsDetailByStoreParams,
  Pageable,
  ProductRecommendationDetailsDto,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerProductRecommendation extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-product-recommendation
   * @name AppCustomerProductRecommendationControllerGetProductRecommendationsByStore
   * @summary Get product recommendations from the store
   * @request GET:/app-customer-product-recommendation/by-store
   * @secure
   * @response `200` `(Pageable & { items?: (ProductRecommendationDetailsDto)[] })`
   */
  getProductRecommendationsByStore = (
    query: AppCustomerProductRecommendationControllerGetProductRecommendationsByStoreParams,
  ): Observable<Pageable & { items?: ProductRecommendationDetailsDto[] }> =>
    this.request<Pageable & { items?: ProductRecommendationDetailsDto[] }, any>(
      `/app-customer-product-recommendation/by-store`,
      'GET',
      null,
      query,
    );

  /**
   * No description
   *
   * @tags app-customer-product-recommendation
   * @name AppCustomerProductRecommendationControllerGetProductRecommendationsDetailByStore
   * @summary Get product recommendations from the store
   * @request GET:/app-customer-product-recommendation/by-store/detail
   * @secure
   * @response `200` `(Pageable & { items?: (ProductRecommendationDetailsDto)[] })`
   */
  getProductRecommendationsDetailByStore = (
    query: AppCustomerProductRecommendationControllerGetProductRecommendationsDetailByStoreParams,
  ): Observable<Pageable & { items?: ProductRecommendationDetailsDto[] }> =>
    this.request<Pageable & { items?: ProductRecommendationDetailsDto[] }, any>(
      `/app-customer-product-recommendation/by-store/detail`,
      'GET',
      null,
      query,
    );

  /**
   * No description
   *
   * @tags app-customer-product-recommendation
   * @name AppCustomerProductRecommendationControllerGetProductRecommendationDetailById
   * @summary Get product recommendation by id
   * @request GET:/app-customer-product-recommendation/{id}
   * @secure
   * @response `200` `ProductRecommendationDetailsDto`
   */
  getProductRecommendationDetailById = (id: string): Observable<ProductRecommendationDetailsDto> =>
    this.request<ProductRecommendationDetailsDto, any>(`/app-customer-product-recommendation/${id}`, 'GET');
}

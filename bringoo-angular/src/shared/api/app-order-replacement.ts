import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  AppOrderReplacementControllerStoreProductsForCategoryParams,
  AppOrderReplacementControllerStoreProductsForSubCategoryParams,
  CheckoutDto,
  Object,
  OrderReplacementDto,
  PageableProductDto,
  ProductReplaceInput,
  ReplacementCheckoutInput,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppOrderReplacement extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerGetAllReplacements
   * @summary Get all order replacements
   * @request GET:/app-order-replacement/{orderId}
   * @secure
   * @response `200` `(OrderReplacementDto)[]`
   */
  getAllReplacements = (orderId: string): Observable<OrderReplacementDto[]> =>
    this.request<OrderReplacementDto[], any>(`/app-order-replacement/${orderId}`, 'GET');

  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerExtendTime
   * @summary Extend order replacement time
   * @request PATCH:/app-order-replacement/{orderId}
   * @secure
   * @response `200` `number`
   */
  extendTime = (orderId: string, data?: Object): Observable<number> =>
    this.request<number, Object>(`/app-order-replacement/${orderId}`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerTerminate
   * @summary Terminate order replacement
   * @request DELETE:/app-order-replacement/{orderId}
   * @secure
   * @response `200` `boolean`
   */
  terminate = (orderId: string): Observable<boolean> => this.request<boolean, any>(`/app-order-replacement/${orderId}`, 'DELETE');
  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerGetActiveReplacement
   * @summary Get active order replacement
   * @request GET:/app-order-replacement/{orderId}/active
   * @secure
   * @response `200` `OrderReplacementDto`
   */
  getActiveReplacement = (orderId: string): Observable<OrderReplacementDto> =>
    this.request<OrderReplacementDto, any>(`/app-order-replacement/${orderId}/active`, 'GET');

  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerCheckout
   * @summary Checkout for order replacement
   * @request POST:/app-order-replacement/{orderId}/checkout
   * @secure
   * @response `201` `CheckoutDto`
   */
  checkout = (orderId: string, data: ReplacementCheckoutInput): Observable<CheckoutDto> =>
    this.request<CheckoutDto, ReplacementCheckoutInput>(`/app-order-replacement/${orderId}/checkout`, 'POST', data);

  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerRemoveItem
   * @summary Remove item from list
   * @request DELETE:/app-order-replacement/{orderId}/{itemId}
   * @secure
   * @response `200` `OrderReplacementDto`
   */
  removeItem = (orderId: string, itemId: string): Observable<OrderReplacementDto> =>
    this.request<OrderReplacementDto, any>(`/app-order-replacement/${orderId}/${itemId}`, 'DELETE');

  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerRecoverItem
   * @summary Recover item
   * @request PATCH:/app-order-replacement/{orderId}/{itemId}
   * @secure
   * @response `200` `OrderReplacementDto`
   */
  recoverItem = (orderId: string, itemId: string, data?: Object): Observable<OrderReplacementDto> =>
    this.request<OrderReplacementDto, Object>(`/app-order-replacement/${orderId}/${itemId}`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerSetReplacement
   * @summary Create or update replacement item
   * @request POST:/app-order-replacement/{orderId}/set-replacement
   * @secure
   * @response `201` `OrderReplacementDto`
   */
  setReplacement = (orderId: string, data: ProductReplaceInput): Observable<OrderReplacementDto> =>
    this.request<OrderReplacementDto, ProductReplaceInput>(`/app-order-replacement/${orderId}/set-replacement`, 'POST', data);

  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerStoreProductsForCategory
   * @summary Get Store products from same category.
   * @request GET:/app-order-replacement/{orderId}/{itemId}/category-products
   * @secure
   * @response `200` `PageableProductDto`
   */
  storeProductsForCategory = ({
    orderId,
    itemId,
    ...query
  }: AppOrderReplacementControllerStoreProductsForCategoryParams): Observable<PageableProductDto> =>
    this.request<PageableProductDto, any>(`/app-order-replacement/${orderId}/${itemId}/category-products`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-order-replacement
   * @name AppOrderReplacementControllerStoreProductsForSubCategory
   * @summary Get Store products from same subcategory.
   * @request GET:/app-order-replacement/{orderId}/{itemId}/subcategory-products
   * @secure
   * @response `200` `PageableProductDto`
   */
  storeProductsForSubCategory = ({
    orderId,
    itemId,
    ...query
  }: AppOrderReplacementControllerStoreProductsForSubCategoryParams): Observable<PageableProductDto> =>
    this.request<PageableProductDto, any>(`/app-order-replacement/${orderId}/${itemId}/subcategory-products`, 'GET', null, query);
}

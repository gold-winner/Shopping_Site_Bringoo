import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  AppCartControllerOrdersParams,
  CancelInput,
  CartAddressCreateInput,
  CartDto,
  CartInfoDto,
  CartReplaceTypeInput,
  CheckoutDto,
  CheckoutInput,
  MetaDto,
  Object,
  OrderDetailsDto,
  OrderHistoryDto,
  PageableOrderDto,
  ProductInput,
  ShoppingExperienceInput,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCart extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerReplaceTypes
   * @summary Types of response to the lack of a product.
   * @request GET:/app-cart/replace-types
   * @secure
   * @response `200` `(MetaDto)[]`
   */
  replaceTypes = (): Observable<MetaDto[]> => this.request<MetaDto[], any>(`/app-cart/replace-types`, 'GET');
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerAddProduct
   * @summary Add product in customer cart.
   * @request POST:/app-cart/set-product
   * @secure
   * @response `201` `CartInfoDto`
   */
  addProduct = (data: ProductInput): Observable<CartInfoDto> =>
    this.request<CartInfoDto, ProductInput>(`/app-cart/set-product`, 'POST', data);

  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerCartList
   * @summary Get carts for logined customer.
   * @request GET:/app-cart/carts
   * @secure
   * @response `200` `(CartDto)[]`
   */
  cartList = (): Observable<CartDto[]> => this.request<CartDto[], any>(`/app-cart/carts`, 'GET');
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerFindCart
   * @summary Find one cart by cartId.
   * @request GET:/app-cart/carts/{id}
   * @secure
   * @response `200` `CartDto`
   */
  findCart = (id: string): Observable<CartDto> => this.request<CartDto, any>(`/app-cart/carts/${id}`, 'GET');
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerSetCartReplaceType
   * @summary Set replace type for customer cart.
   * @request PATCH:/app-cart/cart/{storeId}/replaceType
   * @secure
   * @response `200` `boolean`
   */
  setCartReplaceType = (storeId: string, data: CartReplaceTypeInput): Observable<boolean> =>
    this.request<boolean, CartReplaceTypeInput>(`/app-cart/cart/${storeId}/replaceType`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerCartDetails
   * @summary Find one cart by storeId.
   * @request GET:/app-cart/cart/{storeId}
   * @secure
   * @response `200` `CartDto`
   */
  cartDetails = (storeId: string): Observable<CartDto> => this.request<CartDto, any>(`/app-cart/cart/${storeId}`, 'GET');
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerSetItemReplaceType
   * @summary Set replace type for cart item.
   * @request PATCH:/app-cart/cart/item/{cartItemId}/replaceType
   * @secure
   * @response `200` `boolean`
   */
  setItemReplaceType = (cartItemId: string, data: CartReplaceTypeInput): Observable<boolean> =>
    this.request<boolean, CartReplaceTypeInput>(`/app-cart/cart/item/${cartItemId}/replaceType`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerDelete
   * @summary Delete cart.
   * @request DELETE:/app-cart/cart/{id}
   * @secure
   * @response `200` `boolean`
   */
  delete = (id: string): Observable<boolean> => this.request<boolean, any>(`/app-cart/cart/${id}`, 'DELETE');
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerUpdateAddress
   * @summary Update address for cart.
   * @request PATCH:/app-cart/cart/{id}/address
   * @secure
   * @response `200` `CartDto`
   */
  updateAddress = (id: string, data: CartAddressCreateInput): Observable<CartDto> =>
    this.request<CartDto, CartAddressCreateInput>(`/app-cart/cart/${id}/address`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerAccept
   * @summary Accept cart.
   * @request PATCH:/app-cart/accept/{id}
   * @secure
   * @response `200` `boolean`
   */
  accept = (id: string, data?: Object): Observable<boolean> => this.request<boolean, Object>(`/app-cart/accept/${id}`, 'PATCH', data);
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerCheckout
   * @summary Checkout cart. Create order.
   * @request POST:/app-cart/checkout/{id}
   * @secure
   * @response `201` `CheckoutDto`
   */
  checkout = (id: string, data: CheckoutInput): Observable<CheckoutDto> =>
    this.request<CheckoutDto, CheckoutInput>(`/app-cart/checkout/${id}`, 'POST', data);

  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerOrders
   * @summary Get orders.
   * @request GET:/app-cart/orders
   * @secure
   * @response `200` `PageableOrderDto`
   */
  orders = (query: AppCartControllerOrdersParams): Observable<PageableOrderDto> =>
    this.request<PageableOrderDto, any>(`/app-cart/orders`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerOrder
   * @summary Get order by orderId.
   * @request GET:/app-cart/orders/{id}
   * @secure
   * @response `200` `OrderDetailsDto`
   */
  order = (id: string): Observable<OrderDetailsDto> => this.request<OrderDetailsDto, any>(`/app-cart/orders/${id}`, 'GET');
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerOrderHistory
   * @summary Get order-history by orderId.
   * @request GET:/app-cart/orders/{id}/history
   * @secure
   * @response `200` `OrderHistoryDto`
   */
  orderHistory = (id: string): Observable<OrderHistoryDto> => this.request<OrderHistoryDto, any>(`/app-cart/orders/${id}/history`, 'GET');
  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerDeleteOrder
   * @summary Cancel order by orderId.
   * @request PATCH:/app-cart/orders/{id}/cancel
   * @secure
   * @response `200` `boolean`
   */
  deleteOrder = (id: string, data: CancelInput): Observable<boolean> =>
    this.request<boolean, CancelInput>(`/app-cart/orders/${id}/cancel`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-cart
   * @name AppCartControllerSetCustomerShoppingExperience
   * @summary Set customer shopping experience.
   * @request PATCH:/app-cart/orders/{id}/shopping-experience
   * @secure
   * @response `200` `boolean`
   */
  setCustomerShoppingExperience = (id: string, data: ShoppingExperienceInput): Observable<boolean> =>
    this.request<boolean, ShoppingExperienceInput>(`/app-cart/orders/${id}/shopping-experience`, 'PATCH', data);
}

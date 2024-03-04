import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  CartEntity,
  CreateCartFromShoppingListInput,
  ShoppingListCreateInput,
  ShoppingListDto,
  ShoppingListProductDto,
  ShoppingListProductLinkInput,
  ShoppingListRenameInput,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppShoppingList extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-shopping-list
   * @name AppShoppingListControllerCreateCustomerList
   * @summary Create a customer's shopping list
   * @request POST:/app-shopping-list
   * @secure
   * @response `200` `ShoppingListDto`
   */
  createCustomerList = (data: ShoppingListCreateInput): Observable<ShoppingListDto> =>
    this.request<ShoppingListDto, ShoppingListCreateInput>(`/app-shopping-list`, 'POST', data);

  /**
   * No description
   *
   * @tags app-shopping-list
   * @name AppShoppingListControllerRenameCustomerList
   * @summary Rename the customer's shopping list
   * @request PATCH:/app-shopping-list/rename
   * @secure
   * @response `200` `ShoppingListDto`
   */
  renameCustomerList = (data: ShoppingListRenameInput): Observable<ShoppingListDto> =>
    this.request<ShoppingListDto, ShoppingListRenameInput>(`/app-shopping-list/rename`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-shopping-list
   * @name AppShoppingListControllerGetCustomerListProducts
   * @summary Get the customer's shopping list products
   * @request GET:/app-shopping-list/{listId}
   * @secure
   * @response `200` `ShoppingListDto`
   */
  getCustomerListProducts = (listId: string): Observable<ShoppingListDto> =>
    this.request<ShoppingListDto, any>(`/app-shopping-list/${listId}`, 'GET');

  /**
   * No description
   *
   * @tags app-shopping-list
   * @name AppShoppingListControllerDeleteCustomerList
   * @summary Delete the customer's shopping list
   * @request DELETE:/app-shopping-list/{listId}
   * @secure
   * @response `200` `boolean`
   */
  deleteCustomerList = (listId: string): Observable<boolean> => this.request<boolean, any>(`/app-shopping-list/${listId}`, 'DELETE');
  /**
   * No description
   *
   * @tags app-shopping-list
   * @name AppShoppingListControllerAddProductToList
   * @summary Add a product to the shopping list
   * @request PATCH:/app-shopping-list/product/add
   * @secure
   * @response `200` `ShoppingListDto`
   */
  addProductToList = (data: ShoppingListProductLinkInput): Observable<ShoppingListDto> =>
    this.request<ShoppingListDto, ShoppingListProductLinkInput>(`/app-shopping-list/product/add`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-shopping-list
   * @name AppShoppingListControllerRemoveProductFromList
   * @summary Remove the product from the shopping list
   * @request PATCH:/app-shopping-list/product/remove
   * @secure
   * @response `200` `ShoppingListDto`
   */
  removeProductFromList = (data: ShoppingListProductLinkInput): Observable<ShoppingListDto> =>
    this.request<ShoppingListDto, ShoppingListProductLinkInput>(`/app-shopping-list/product/remove`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-shopping-list
   * @name AppShoppingListControllerGetLastPurchasedProducts
   * @summary Get products form X last orders
   * @request GET:/app-shopping-list/last-purchased-products/{listId}/{lastOrdersAmount}
   * @secure
   * @response `200` `(ShoppingListProductDto)[]`
   */
  getLastPurchasedProducts = (listId: string, lastOrdersAmount: number): Observable<ShoppingListProductDto[]> =>
    this.request<ShoppingListProductDto[], any>(`/app-shopping-list/last-purchased-products/${listId}/${lastOrdersAmount}`, 'GET');

  /**
   * No description
   *
   * @tags app-shopping-list
   * @name AppShoppingListControllerCreateCartFromList
   * @summary Create a cart from the shopping list
   * @request POST:/app-shopping-list/create-cart-from-list
   * @secure
   * @response `200` `CartEntity`
   */
  createCartFromList = (data: CreateCartFromShoppingListInput): Observable<CartEntity> =>
    this.request<CartEntity, CreateCartFromShoppingListInput>(`/app-shopping-list/create-cart-from-list`, 'POST', data);
}

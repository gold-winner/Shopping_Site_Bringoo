import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  AppStoreControllerGetTimeSlotsParams,
  AppStoreControllerStoreParams,
  AppStoreControllerStoreProductsAllParams,
  AppStoreControllerStoreProductsForCategoryParams,
  AppStoreControllerStoreProductsForSubCategoryParams,
  AppStoreControllerStoreProductsParams,
  AppStoreControllerStoreProductsSearchParams,
  AppStoreControllerStoresParams,
  AppStoreControllerVendorTypesParams,
  CategoryDto,
  PageableProductDto,
  PageableStoreDto,
  PageableVendorTypesDto,
  ProductLinkDetailsDto,
  ReservationInput,
  ShoppingListGeneralInfoDto,
  StoreDto,
  StorePurschasedProductDto,
  StoreSchedulerDayDto,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppStore extends ApiDefaultService {
  /**
   * @description use GET:/app-vendor-type/
   *
   * @tags app-store
   * @name AppStoreControllerVendorTypes
   * @summary Get Vendor-types.
   * @request GET:/app-store/vendor-types
   * @secure
   * @response `200` `PageableVendorTypesDto`
   */
  vendorTypes = (query: AppStoreControllerVendorTypesParams): Observable<PageableVendorTypesDto> =>
    this.request<PageableVendorTypesDto, any>(`/app-store/vendor-types`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerStores
   * @summary Get Stores.
   * @request GET:/app-store/stores
   * @secure
   * @response `200` `PageableStoreDto`
   */
  stores = (query: AppStoreControllerStoresParams): Observable<PageableStoreDto> =>
    this.request<PageableStoreDto, any>(`/app-store/stores`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerStore
   * @summary Get Store by storeId.
   * @request GET:/app-store/stores/{id}
   * @secure
   * @response `200` `StoreDto`
   */
  store = ({ id, ...query }: AppStoreControllerStoreParams): Observable<StoreDto> =>
    this.request<StoreDto, any>(`/app-store/stores/${id}`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerCategoriesSubcategories
   * @summary Get Store product-categories by storeId.
   * @request GET:/app-store/stores/{id}/categories
   * @secure
   * @response `200` `(CategoryDto)[]`
   */
  categoriesSubcategories = (id: string): Observable<CategoryDto[]> =>
    this.request<CategoryDto[], any>(`/app-store/stores/${id}/categories`, 'GET');

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerStoreProducts
   * @summary Get Store products by storeId.
   * @request GET:/app-store/stores/{id}/products
   * @secure
   * @response `200` `(PageableProductDto)[]`
   */
  storeProducts = ({ id, ...query }: AppStoreControllerStoreProductsParams): Observable<PageableProductDto[]> =>
    this.request<PageableProductDto[], any>(`/app-store/stores/${id}/products`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerStoreProductsAll
   * @summary Get Store products by storeId.
   * @request GET:/app-store/stores/{id}/products/all
   * @secure
   * @response `200` `PageableProductDto`
   */
  storeProductsAll = ({ id, ...query }: AppStoreControllerStoreProductsAllParams): Observable<PageableProductDto> =>
    this.request<PageableProductDto, any>(`/app-store/stores/${id}/products/all`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerStoreProductsSearch
   * @summary Store products search.
   * @request GET:/app-store/stores/{id}/products-search/{search}
   * @secure
   * @response `200` `PageableProductDto`
   */
  storeProductsSearch = ({ id, search, ...query }: AppStoreControllerStoreProductsSearchParams): Observable<PageableProductDto> =>
    this.request<PageableProductDto, any>(`/app-store/stores/${id}/products-search/${search}`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerStoreProductsForCategory
   * @summary Get Store products for category.
   * @request GET:/app-store/stores/{id}/products/category/{code}
   * @secure
   * @response `200` `PageableProductDto`
   */
  storeProductsForCategory = ({ id, code, ...query }: AppStoreControllerStoreProductsForCategoryParams): Observable<PageableProductDto> =>
    this.request<PageableProductDto, any>(`/app-store/stores/${id}/products/category/${code}`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerStoreProductsForSubCategory
   * @summary Get Store products for subcategory.
   * @request GET:/app-store/stores/{id}/products/subcategory/{code}
   * @secure
   * @response `200` `PageableProductDto`
   */
  storeProductsForSubCategory = ({
    id,
    code,
    ...query
  }: AppStoreControllerStoreProductsForSubCategoryParams): Observable<PageableProductDto> =>
    this.request<PageableProductDto, any>(`/app-store/stores/${id}/products/subcategory/${code}`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerProductDetailsByLink
   * @summary Get Store product details.
   * @request GET:/app-store/products/{linkId}
   * @secure
   * @response `200` `ProductLinkDetailsDto`
   */
  productDetailsByLink = (linkId: string): Observable<ProductLinkDetailsDto> =>
    this.request<ProductLinkDetailsDto, any>(`/app-store/products/${linkId}`, 'GET');

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerGetTimeSlots
   * @summary Get timeslots for store
   * @request GET:/app-store/stores/{id}/delivery-slots
   * @secure
   * @response `200` `(StoreSchedulerDayDto)[]`
   */
  getTimeSlots = ({ id, ...query }: AppStoreControllerGetTimeSlotsParams): Observable<StoreSchedulerDayDto[]> =>
    this.request<StoreSchedulerDayDto[], any>(`/app-store/stores/${id}/delivery-slots`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerGetReservation
   * @summary Get slot reservation
   * @request GET:/app-store/stores/{id}/slot-reservation
   * @secure
   * @response `200` `number`
   */
  getReservation = (id: string): Observable<number> => this.request<number, any>(`/app-store/stores/${id}/slot-reservation`, 'GET');
  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerCreateReservation
   * @summary Create reservation
   * @request POST:/app-store/stores/{id}/slot-reservation
   * @secure
   * @response `201` `number`
   */
  createReservation = (id: string, data: ReservationInput): Observable<number> =>
    this.request<number, ReservationInput>(`/app-store/stores/${id}/slot-reservation`, 'POST', data);

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerGetCustomerLists
   * @summary Get customer's shopping lists
   * @request GET:/app-store/stores/{id}/shopping-list
   * @secure
   * @response `200` `(ShoppingListGeneralInfoDto)[]`
   */
  getCustomerLists = (id: string): Observable<ShoppingListGeneralInfoDto[]> =>
    this.request<ShoppingListGeneralInfoDto[], any>(`/app-store/stores/${id}/shopping-list`, 'GET');

  /**
   * No description
   *
   * @tags app-store
   * @name AppStoreControllerGetCustomerPreviouslyPurchasedProducts
   * @summary Get customer's previously purchased products
   * @request GET:/app-store/stores/{id}/previously-purchased-products
   * @secure
   * @response `200` `(StorePurschasedProductDto)[]`
   */
  getCustomerPreviouslyPurchasedProducts = (id: string): Observable<StorePurschasedProductDto[]> =>
    this.request<StorePurschasedProductDto[], any>(`/app-store/stores/${id}/previously-purchased-products`, 'GET');
}

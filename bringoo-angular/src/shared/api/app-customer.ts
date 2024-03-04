import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import {
  AddressCreateInput,
  AddressTypeEnum,
  AddressUpdateInput,
  CustomerAddressDto,
  CustomerProfileDto,
  LanguageDto,
  NationalityDto,
  OrderCancelReasonDto,
  ProfilePhoneNumberUpdateInput,
  ProfilePhotoUpdateInput,
  ProfileUpdateInput,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomer extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerLanguages
   * @summary Get languages.
   * @request GET:/app-customer/languages
   * @secure
   * @response `200` `(LanguageDto)[]`
   */
  languages = (): Observable<LanguageDto[]> => this.request<LanguageDto[], any>(`/app-customer/languages`, 'GET');
  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerNationalities
   * @summary Get nationalities.
   * @request GET:/app-customer/nationalities
   * @secure
   * @response `200` `(NationalityDto)[]`
   */
  nationalities = (): Observable<NationalityDto[]> => this.request<NationalityDto[], any>(`/app-customer/nationalities`, 'GET');
  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerOrderCancelReasons
   * @summary Get cancel reasons for orders.
   * @request GET:/app-customer/order-cancel-reasons
   * @secure
   * @response `200` `(OrderCancelReasonDto)[]`
   */
  orderCancelReasons = (): Observable<OrderCancelReasonDto[]> =>
    this.request<OrderCancelReasonDto[], any>(`/app-customer/order-cancel-reasons`, 'GET');

  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerProfileGet
   * @summary Customer profile.
   * @request GET:/app-customer/profile
   * @secure
   * @response `200` `CustomerProfileDto`
   */
  profileGet = (): Observable<CustomerProfileDto> => this.request<CustomerProfileDto, any>(`/app-customer/profile`, 'GET');
  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerUpdateProfile
   * @summary Customer profile update except for phone number.
   * @request PATCH:/app-customer/profile
   * @secure
   * @response `200` `CustomerProfileDto`
   */
  updateProfile = (data: ProfileUpdateInput): Observable<CustomerProfileDto> =>
    this.request<CustomerProfileDto, ProfileUpdateInput>(`/app-customer/profile`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerUpdateProfilePhoneNumber
   * @summary Customer profile phone number update.
   * @request PATCH:/app-customer/profile/phone-number
   * @secure
   * @response `200` `CustomerProfileDto`
   */
  updateProfilePhoneNumber = (data: ProfilePhoneNumberUpdateInput): Observable<CustomerProfileDto> =>
    this.request<CustomerProfileDto, ProfilePhoneNumberUpdateInput>(`/app-customer/profile/phone-number`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerUpdateProfilePhoto
   * @summary Customer profile photo update.
   * @request PATCH:/app-customer/profile/photo
   * @secure
   * @response `200` `boolean`
   */
  updateProfilePhoto = (data: ProfilePhotoUpdateInput): Observable<boolean> =>
    this.request<boolean, ProfilePhotoUpdateInput>(`/app-customer/profile/photo`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerRemoveProfilePhoto
   * @summary Customer profile photo remove.
   * @request DELETE:/app-customer/profile/photo
   * @secure
   * @response `200` `boolean`
   */
  removeProfilePhoto = (): Observable<boolean> => this.request<boolean, any>(`/app-customer/profile/photo`, 'DELETE');
  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerGetAllAddresses
   * @summary Get customer addresses
   * @request GET:/app-customer/addresses
   * @secure
   * @response `200` `(CustomerAddressDto)[]`
   */
  getAllAddresses = (): Observable<CustomerAddressDto[]> => this.request<CustomerAddressDto[], any>(`/app-customer/addresses`, 'GET');
  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerGetAddresses
   * @summary Get customer address by addressType.
   * @request GET:/app-customer/addresses/{type}
   * @secure
   * @response `200` `(CustomerAddressDto)[]`
   */
  getAddresses = (type: AddressTypeEnum): Observable<CustomerAddressDto[]> =>
    this.request<CustomerAddressDto[], any>(`/app-customer/addresses/${type}`, 'GET');

  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerCreateAddress
   * @summary Create address.
   * @request POST:/app-customer/address
   * @secure
   * @response `201` `CustomerAddressDto`
   */
  createAddress = (data: AddressCreateInput): Observable<CustomerAddressDto> =>
    this.request<CustomerAddressDto, AddressCreateInput>(`/app-customer/address`, 'POST', data);

  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerGetAddress
   * @summary Get customer address by addressId.
   * @request GET:/app-customer/address/{id}
   * @secure
   * @response `200` `CustomerAddressDto`
   */
  getAddress = (id: string): Observable<CustomerAddressDto> => this.request<CustomerAddressDto, any>(`/app-customer/address/${id}`, 'GET');
  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerUpdateAddress
   * @summary Update customer address by addressId.
   * @request PATCH:/app-customer/address/{id}
   * @secure
   * @response `200` `CustomerAddressDto`
   */
  updateAddress = (id: string, data: AddressUpdateInput): Observable<CustomerAddressDto> =>
    this.request<CustomerAddressDto, AddressUpdateInput>(`/app-customer/address/${id}`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerDeleteAddress
   * @summary Delete customer address by addressId.
   * @request DELETE:/app-customer/address/{id}
   * @secure
   * @response `200` `boolean`
   */
  deleteAddress = (id: string): Observable<boolean> => this.request<boolean, any>(`/app-customer/address/${id}`, 'DELETE');
  /**
   * No description
   *
   * @tags app-customer
   * @name AppCustomerControllerDeleteAccount
   * @summary Delete customer.
   * @request DELETE:/app-customer/delete-account
   * @secure
   * @response `200` `boolean`
   */
  deleteAccount = (): Observable<boolean> => this.request<boolean, any>(`/app-customer/delete-account`, 'DELETE');
}

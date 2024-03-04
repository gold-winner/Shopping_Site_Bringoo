import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { CityZipCodesDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerGeo extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-geo
   * @name AppCustomerGeoControllerGetCityZipCodes
   * @summary Get Cities zip codes
   * @request GET:/app-customer-geo/cities-zip-codes
   * @secure
   * @response `200` `(CityZipCodesDto)[]`
   */
  getCityZipCodes = (): Observable<CityZipCodesDto[]> => this.request<CityZipCodesDto[], any>(`/app-customer-geo/cities-zip-codes`, 'GET');
}

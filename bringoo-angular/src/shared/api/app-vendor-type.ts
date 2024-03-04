import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { AppVendorTypeControllerStoresParams, VendorTypeDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppVendorType extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-vendor-type
   * @name AppVendorTypeControllerStores
   * @summary Get Vendor types.
   * @request GET:/app-vendor-type
   * @secure
   * @response `200` `(VendorTypeDto)[]`
   */
  stores = (query: AppVendorTypeControllerStoresParams): Observable<VendorTypeDto[]> =>
    this.request<VendorTypeDto[], any>(`/app-vendor-type`, 'GET', null, query);
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { ProductConsultationCallbackInput, ProductConsultationFeedbackInput, StoreConsultantDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppProductConsultation extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-product-consultation
   * @name AppProductConsultationControllerGetStoreConsultant
   * @summary Get Store consultant details for product
   * @request GET:/app-product-consultation/product/{linkId}/consultant
   * @secure
   * @response `200` `StoreConsultantDto`
   */
  getStoreConsultant = (linkId: string): Observable<StoreConsultantDto> =>
    this.request<StoreConsultantDto, any>(`/app-product-consultation/product/${linkId}/consultant`, 'GET');

  /**
   * No description
   *
   * @tags app-product-consultation
   * @name AppProductConsultationControllerCreateProductConsultationFeedback
   * @summary Create feedback request for product
   * @request POST:/app-product-consultation/product/{linkId}/product-feedback
   * @secure
   * @response `201` `string`
   */
  createProductConsultationFeedback = (linkId: string, data: ProductConsultationFeedbackInput): Observable<string> =>
    this.request<string, ProductConsultationFeedbackInput>(`/app-product-consultation/product/${linkId}/product-feedback`, 'POST', data);

  /**
   * No description
   *
   * @tags app-product-consultation
   * @name AppProductConsultationControllerCreateProductConsultationCallback
   * @summary Create callback request for product
   * @request POST:/app-product-consultation/product/{linkId}/product-callback
   * @secure
   * @response `201` `string`
   */
  createProductConsultationCallback = (linkId: string, data: ProductConsultationCallbackInput): Observable<string> =>
    this.request<string, ProductConsultationCallbackInput>(`/app-product-consultation/product/${linkId}/product-callback`, 'POST', data);
}

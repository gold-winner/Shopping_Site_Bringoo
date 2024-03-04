import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { CartItemNoteDto, LineItemCustomerNoteInput } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCartItem extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-cart-item
   * @name AppCartItemControllerGetNote
   * @summary Get cart item note
   * @request GET:/app-cart-item/{id}/note
   * @secure
   * @response `200` `CartItemNoteDto`
   */
  getNote = (id: string): Observable<CartItemNoteDto> => this.request<CartItemNoteDto, any>(`/app-cart-item/${id}/note`, 'GET');
  /**
   * No description
   *
   * @tags app-cart-item
   * @name AppCartItemControllerSetNote
   * @summary Get cart item note
   * @request PATCH:/app-cart-item/{id}/note
   * @secure
   * @response `200` `CartItemNoteDto`
   */
  setNote = (id: string, data: LineItemCustomerNoteInput): Observable<CartItemNoteDto> =>
    this.request<CartItemNoteDto, LineItemCustomerNoteInput>(`/app-cart-item/${id}/note`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-cart-item
   * @name AppCartItemControllerDeleteNote
   * @summary Get cart item note
   * @request DELETE:/app-cart-item/{id}/note
   * @secure
   * @response `200` `CartItemNoteDto`
   */
  deleteNote = (id: string): Observable<CartItemNoteDto> => this.request<CartItemNoteDto, any>(`/app-cart-item/${id}/note`, 'DELETE');
}

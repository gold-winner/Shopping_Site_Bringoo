import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { LineItemCustomerNoteInput, OrderItemNoteDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppOrderItem extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-order-item
   * @name AppOrderItemControllerGetNote
   * @summary Get order item note
   * @request GET:/app-order-item/{id}
   * @secure
   * @response `200` `OrderItemNoteDto`
   */
  getNote = (id: string): Observable<OrderItemNoteDto> => this.request<OrderItemNoteDto, any>(`/app-order-item/${id}`, 'GET');
  /**
   * No description
   *
   * @tags app-order-item
   * @name AppOrderItemControllerSetNote
   * @summary Get order item note
   * @request PATCH:/app-order-item/{id}
   * @secure
   * @response `200` `OrderItemNoteDto`
   */
  setNote = (id: string, data: LineItemCustomerNoteInput): Observable<OrderItemNoteDto> =>
    this.request<OrderItemNoteDto, LineItemCustomerNoteInput>(`/app-order-item/${id}`, 'PATCH', data);

  /**
   * No description
   *
   * @tags app-order-item
   * @name AppOrderItemControllerDeleteNote
   * @summary Get order item note
   * @request DELETE:/app-order-item/{id}
   * @secure
   * @response `200` `OrderItemNoteDto`
   */
  deleteNote = (id: string): Observable<OrderItemNoteDto> => this.request<OrderItemNoteDto, any>(`/app-order-item/${id}`, 'DELETE');
}

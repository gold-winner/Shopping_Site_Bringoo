import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { ReplacementMessageReadInput } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerLog extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-log
   * @name AppCustomerLogControllerReplacementMessageRead
   * @summary Customer has seen product replacement message
   * @request POST:/app-customer-log/replacement-message-read
   * @secure
   * @response `201` `boolean`
   */
  replacementMessageRead = (data: ReplacementMessageReadInput): Observable<boolean> =>
    this.request<boolean, ReplacementMessageReadInput>(`/app-customer-log/replacement-message-read`, 'POST', data);
}

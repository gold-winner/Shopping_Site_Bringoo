import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerIdService {
  private _customerId: string = '';

  get customerId(): string {
    return this._customerId;
  }

  set customerId(id: string) {
    this._customerId = id;
  }
}

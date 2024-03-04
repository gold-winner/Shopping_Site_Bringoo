import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _storeId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idObserver$: Observable<string> = this._storeId.asObservable();

  private _filterSelectedProducts: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  productsFilter$: Observable<string[]> = this._filterSelectedProducts.asObservable();

  get storeId(): string {
    return this._storeId.getValue();
  }

  set storeId(id: string) {
    this._storeId.next(id);
  }

  set filterSelectedProducts(productIds: string[]) {
    this._filterSelectedProducts.next([...productIds]);
  }

  get filterSelectedProducts(): string[] {
    return this._filterSelectedProducts.getValue();
  }
}

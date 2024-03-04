import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { StoreEntity } from '../../../shared/api/auth/data-contracts';
import { BreadCrumbModel } from '../../../shared/models/bread-crumb-model.model';

@Injectable({
  providedIn: 'root',
})
export class StoreDetailsService {
  private _breadcrumbs: BehaviorSubject<BreadCrumbModel[]> = new BehaviorSubject<BreadCrumbModel[]>([]);
  crumbs$: Observable<BreadCrumbModel[]> = this._breadcrumbs.asObservable();
  private _storeName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  storeName$: Observable<string> = this._storeName.asObservable();

  private _storeSubject: BehaviorSubject<StoreEntity> = new BehaviorSubject<StoreEntity>({} as StoreEntity);
  store$: Observable<StoreEntity> = this._storeSubject.asObservable();

  set breadcrumbs(crumbs: BreadCrumbModel[]) {
    this._breadcrumbs.next([...crumbs]);
  }

  get breadcrumbs(): BreadCrumbModel[] {
    return this._breadcrumbs.getValue();
  }

  set storeName(name: string) {
    this._storeName.next(name);
  }

  get storeName(): string {
    return this._storeName.getValue();
  }

  set store(store: StoreEntity) {
    this._storeSubject.next(store);
  }
}

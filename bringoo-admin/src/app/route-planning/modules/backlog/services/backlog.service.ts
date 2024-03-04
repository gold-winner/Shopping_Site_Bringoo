import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { RouteNumberGenerator } from '../../../../../shared/helpers/route-number-generator';

@Injectable({
  providedIn: 'platform',
})
export class BacklogService {
  private createRouteSubject: Subject<void> = new Subject<void>();

  createRoute$: Observable<void> = this.createRouteSubject.asObservable();
  newRouteUUIDs: Set<string> = new Set<string>();

  createNewRoute(): void {
    const id: string = RouteNumberGenerator();
    this.newRouteUUIDs.add(id);
    this.createRouteSubject.next();
  }

  deleteRouteWhichOnCreatePhase(id: string, removeFormExcludedIds: string[]): void {
    this.newRouteUUIDs.delete(id);

    if (removeFormExcludedIds.length > 0) {
      for (const id of removeFormExcludedIds) {
        this.excludedOrderIds.delete(id);
      }
      this.updatedExcludedOrders.next();
    }
    this.createRouteSubject.next();
  }

  excludedOrderIds: Set<string> = new Set<string>();

  private updatedExcludedOrders: Subject<void> = new Subject();
  updatedExcludedOrders$: Observable<void> = this.updatedExcludedOrders.asObservable();

  addOrderToExclude(id: string): void {
    this.excludedOrderIds.add(id);
    this.updatedExcludedOrders.next();
  }

  removeOrderFromExclude(id: string): void {
    this.excludedOrderIds.delete(id);
    this.updatedExcludedOrders.next();
  }

  private updateRouteByIdSubject: Subject<string> = new Subject();

  updateRouteById$: Observable<string> = this.updateRouteByIdSubject.asObservable();

  updateRoute(id: string): void {
    this.updateRouteByIdSubject.next(id);
  }

  private updateOrdersSubject: Subject<void> = new Subject();
  updateOrders$: Observable<void> = this.updateOrdersSubject.asObservable();

  updateOrders(): void {
    this.updateOrdersSubject.next();
  }
}

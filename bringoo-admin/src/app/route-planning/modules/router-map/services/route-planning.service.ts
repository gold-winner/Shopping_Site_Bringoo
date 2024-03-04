import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ChangeShowOrderStatusType } from '../types/change-show-order-status.type';
import { MarkerTypesType } from '../types/marker-types.type';
import { LogisticKeyPointsService } from './logistic-key-points.service';
import { LogisticOrdersService } from './logistic-orders.service';
import { LogisticRoutesService } from './logistic-routes.service';

@Injectable({
  providedIn: 'root',
})
export class RoutePlanningService {
  constructor(
    private readonly logisticOrdersService: LogisticOrdersService,
    private readonly logisticRoutesService: LogisticRoutesService,
    private readonly logisticKeyPointsService: LogisticKeyPointsService,
  ) {}

  subOnChanges(): void {
    this.logisticOrdersService.subOnSearchChanges();
    this.logisticRoutesService.subOnSearchChanges();
    this.logisticKeyPointsService.subOnSearchChanges();
  }

  private mapMarkers: Subject<google.maps.Marker[]> = new Subject<google.maps.Marker[]>();
  mapMarkers$: Observable<google.maps.Marker[]> = this.mapMarkers.asObservable();
  markersType: MarkerTypesType = null;

  setMarkers(markers: google.maps.Marker[], markersType: MarkerTypesType): void {
    this.markersType = markersType;

    if (!markersType) {
      this.mapMarkers.next([]);
    }

    this.mapMarkers.next([...markers]);
  }

  clearMarkers(fromType: MarkerTypesType): void {
    if (this.markersType === fromType) {
      this.markersType = null;
      this.mapMarkers.next([]);
    }
  }

  private _changeMarkerShowStatus: Subject<ChangeShowOrderStatusType> = new Subject<ChangeShowOrderStatusType>();
  changeMarkerShowStatus$: Observable<ChangeShowOrderStatusType> = this._changeMarkerShowStatus.asObservable();

  changeShowStatus(input: ChangeShowOrderStatusType): void {
    this._changeMarkerShowStatus.next(input);
  }

  private _hideMarkers: Subject<boolean> = new Subject<boolean>();
  hideMarkers$: Observable<boolean> = this._hideMarkers.asObservable();

  hideAllMarkers(): void {
    this._hideMarkers.next(true);
  }

  private _showMarkers: Subject<boolean> = new Subject<boolean>();
  showMarkers$: Observable<boolean> = this._showMarkers.asObservable();

  showAllMarkers(): void {
    this._showMarkers.next(true);
  }

  private _hideMarkersByIds: Subject<Set<string>> = new Subject<Set<string>>();
  hideMarkersByIds$: Observable<Set<string>> = this._hideMarkersByIds.asObservable();

  showMarkersIds(ids: Set<string>): void {
    this._hideMarkersByIds.next(ids);
  }

  //markers END

  reloadAll(): void {
    this.logisticOrdersService.reloadOrders();
    this.logisticRoutesService.reloadRoutes();
    this.logisticKeyPointsService.reloadKeyPoints();
  }

  //route creation
  private createRouteFromOrdersSubject: Subject<string[]> = new Subject<string[]>();
  createRouteFromOrders$: Observable<string[]> = this.createRouteFromOrdersSubject.asObservable();

  createRouteFromOrder(ids: string[]): void {
    this.createRouteFromOrdersSubject.next(ids);
  }
  //route creation END
}

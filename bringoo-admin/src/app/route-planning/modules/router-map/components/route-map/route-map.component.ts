import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CrudKeyPointService } from '../../../../../../shared/api/auth/crud-key-point.service';
import { CrudRouteService } from '../../../../../../shared/api/auth/crud-route.service';
import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import {
  KeyPointDto,
  KeyPointEntity,
  LocationDto,
  OrdersWithStaffInformationDto,
  RouteCreateInput,
  StoreEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { Pageable } from '../../../../../../shared/interfaces/pageable';
import { GoogleMapLoaderService } from '../../../../../../shared/services/google-map-loader.service';
import { RoutePlanningService } from '../../services/route-planning.service';
import { MarkerTypesType } from '../../types/marker-types.type';
import TravelMode = google.maps.TravelMode;
import { LogisticKeyPointsService } from '../../services/logistic-key-points.service';

@UntilDestroy()
@Component({
  selector: 'app-route-map',
  templateUrl: 'route-map.component.html',
  styleUrls: ['route-map.component.scss'],
})
export class RouteMapComponent implements AfterViewInit, OnInit {
  @ViewChild('googleMap') googleMap?: GoogleMap;
  @ViewChild('infoKPWindow') infoKPWindow?: MapInfoWindow;
  @ViewChild('infoOrderWindow') infoOrderWindow?: MapInfoWindow;

  markers: google.maps.Marker[] = [];
  routes: google.maps.DirectionsRenderer[] = [];
  storeMarkerImgUrl: string = '../../../../../../assets/img/map-markers/store-marker.svg';

  openPanel: boolean = false;

  markerClustererImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
  infoWindowKeyPointIdSubject: Subject<KeyPointDto & { index: number }> = new Subject<KeyPointDto & { index: number }>();
  infoWindowOrderIdSubject: Subject<OrdersWithStaffInformationDto & { index: number }> = new Subject<
    OrdersWithStaffInformationDto & { index: number }
  >();

  editedKeyPoint!: KeyPointEntity;
  deleteId!: string;

  $isLoaded: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  options: google.maps.MapOptions = {
    zoom: 10,
    center: { lat: 53.5586941, lng: 9.78774 },
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    mapId: 'a220e32fb4bca089',
  };

  infoWindowOption: google.maps.InfoWindowOptions = {
    maxWidth: 50,
    minWidth: 50,
  };

  directionsService!: google.maps.DirectionsService;

  isLoading$: Observable<boolean> = this.service.isLoading$;
  stores$: Observable<StoreEntity[]>;
  create: Symbol | null = null;

  constructor(
    private readonly googleMapLoaderService: GoogleMapLoaderService,
    private readonly routePlanningService: RoutePlanningService,
    private readonly logisticKeyPointsService: LogisticKeyPointsService,
    private readonly keyPointService: CrudKeyPointService,
    private readonly service: CrudRouteService,
    private readonly notification: NzNotificationService,
    private readonly crudStoreService: CrudStoreService,
  ) {
    this.routePlanningService.mapMarkers$
      .pipe(
        untilDestroyed(this),
        tap((markers: google.maps.Marker[]) => {
          this.onShowMarkers(markers, this.routePlanningService.markersType);
        }),
      )
      .subscribe();

    this.stores$ = this.crudStoreService
      .find({
        join: ['addresses'],
      })
      .pipe(map(({ items }: Pageable & { items?: StoreEntity[] }): StoreEntity[] => items ?? []));
  }

  ngOnInit(): void {
    this.routePlanningService.subOnChanges();
  }

  ngAfterViewInit(): void {
    this.routePlanningService.changeMarkerShowStatus$
      .pipe(
        untilDestroyed(this),
        tap(({ status, id }: { status: boolean; id: string }) => {
          this.markers.find((marker: google.maps.Marker) => marker.get('id') === id)?.setVisible(status);
        }),
      )
      .subscribe();

    this.routePlanningService.hideMarkers$
      .pipe(
        untilDestroyed(this),
        tap(() => {
          for (const marker of this.markers) {
            marker.setVisible(false);
          }
        }),
      )
      .subscribe();

    this.routePlanningService.showMarkers$
      .pipe(
        untilDestroyed(this),
        tap(() => {
          for (const marker of this.markers) {
            marker.setVisible(true);
          }
        }),
      )
      .subscribe();

    this.routePlanningService.hideMarkersByIds$
      .pipe(
        untilDestroyed(this),
        tap((ids: Set<string>) => {
          for (const marker of this.markers) {
            marker.setVisible(ids.has(marker.get('id')));
          }
        }),
      )
      .subscribe();
  }

  onShowMarkers(markers: google.maps.Marker[], type: MarkerTypesType): void {
    this.clearMarkers();
    this.clearRoutes();
    if (type === null) return;

    const map: google.maps.Map | undefined = this.googleMap?.googleMap;
    if (!map) return;

    switch (type) {
      case 'ORDERS': {
        this.setOrdersMarkers(map, markers);
        break;
      }
      case 'KEY_POINTS': {
        this.renderRoute(map, markers);
        break;
      }
    }
  }

  setOrdersMarkers(map: google.maps.Map, markers: google.maps.Marker[]): void {
    for (const marker of markers) {
      marker.setZIndex(1);
      marker.setMap(map);
      const location: google.maps.LatLng | null | undefined = marker.getPosition();

      if (location) {
        marker.addListener('click', () => {
          if (this.infoOrderWindow) {
            this.infoOrderWindow.position = location;
            this.infoOrderWindow.infoWindow?.set('index', marker.get('index'));
            this.infoWindowOrderIdSubject.next(marker.get('order'));
            this.infoOrderWindow.open();
          }
        });
      }
    }

    this.markers = [...markers];
  }

  clearMarkers(): void {
    if (this.markers.length === 0) return;

    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
  }

  clearRoutes(): void {
    if (this.routes.length === 0) return;

    for (const route of this.routes) {
      route.setMap(null);
    }
    this.routes = [];
  }

  renderRoute(map: google.maps.Map, markers: google.maps.Marker[]): void {
    this.clearMarkers();
    this.clearRoutes();

    if (!this.directionsService) {
      this.directionsService = new window.google.maps.DirectionsService();
    }

    const locations: LocationDto[] = [];

    const infoId: string | undefined = this.infoKPWindow?.infoWindow?.get('id');

    for (const marker of markers) {
      if (infoId && infoId === marker.get('routeItem').id) {
        this.infoWindowKeyPointIdSubject.next(marker.get('routeItem'));
      }

      marker.setZIndex(1);
      marker.setMap(map);
      const position: google.maps.LatLngLiteral | undefined = marker.getPosition()?.toJSON();
      if (position) {
        locations.push(position);
        marker.addListener('click', () => {
          if (this.infoKPWindow) {
            this.infoKPWindow.position = position;
            this.infoKPWindow.infoWindow?.set('index', marker.get('index'));
            this.infoKPWindow.infoWindow?.set('id', marker.get('routeItem').id);
            this.infoWindowKeyPointIdSubject.next(marker.get('routeItem'));
            this.infoKPWindow.open();
          }
        });
      }
    }

    this.markers.push(...markers);

    if (locations.length > 1) {
      const originPoint: LocationDto | undefined = locations.shift();
      const destinationPoint: LocationDto | undefined = locations.pop();
      if (!originPoint || !destinationPoint) {
        this.notification.info('Route build', `Route have ${locations.length} item.`);
        return;
      }

      this.directionsService.route(
        {
          travelMode: 'DRIVING' as TravelMode,
          origin: originPoint,
          destination: destinationPoint,
          optimizeWaypoints: true,
          waypoints: locations.map(
            (location: LocationDto): google.maps.DirectionsWaypoint => {
              return {
                location: location as any,
              };
            },
          ),
        },
        (directions: google.maps.DirectionsResult | null) => {
          const render: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            preserveViewport: true,
          });
          if (directions) {
            render.setMap(map);
            render.setDirections(directions);
            this.routes.push(render);
          }
        },
      );
    }
  }

  onShowCreateForm(): void {
    this.openPanel = true;
  }

  onHideCreateForm(): void {
    this.openPanel = false;
  }

  onCreateButtonClick(): void {
    this.create = Symbol('create');
  }

  onCreateRoute(input: RouteCreateInput): void {
    this.service.create(input).subscribe(() => {
      this.onHideCreateForm();
      this.routePlanningService.reloadAll();
    });
  }

  onDeleteKeyPoint(id: string): void {
    this.logisticKeyPointsService.deleteKeyPoint(id);
    this.infoKPWindow?.close();
  }

  onEditKeyPoint(keyPoint: KeyPointDto): void {
    this.logisticKeyPointsService.updateKeyPoint(keyPoint);
  }

  onCloseInfoWindow(IW: MapInfoWindow): void {
    IW.close();
    if (IW.infoWindow?.get('id')) {
      IW.infoWindow?.set('id', null);
    }
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow): void {
    infoWindow.open(marker);
  }
}

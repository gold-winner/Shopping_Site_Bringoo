import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format } from 'date-fns';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';

import { AppManagerStaffService } from '../../../../../../shared/api/auth/app-manager-staff.service';
import { CrudStaffService } from '../../../../../../shared/api/auth/crud-staff.service';
import { DeviceLocationDto, LocationInput, StaffEntity, StaffLocationLiveMapDto } from '../../../../../../shared/api/auth/data-contracts';
import { analyticsGMapStyle } from '../../../../../../shared/config/analytics-g-map-style.config';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { StaffLocationInfoWindowContentHelper } from '../../../../../../shared/helpers/google-maps/staff-location-info-window-content.helper';
import { isNonNull } from '../../../../../../shared/helpers/is-non-null.helper';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { GoogleMapLoaderService } from '../../../../../../shared/services/google-map-loader.service';
import { FilterSearch } from '../../../../../../shared/types/crud-filters.types';
import { markerAndInformationWindow } from '../../../../../../shared/types/marker-and-information.window';
import { StaffLocationGMapInput } from '../../../../../../shared/types/staff-location-g-map.input';

@UntilDestroy()
@Component({
  selector: 'app-staff-live-map',
  templateUrl: 'staff-live-map.component.html',
  styleUrls: ['../../../../../analytics/modules/dashboard/components/dashboard/home-dashboard.component.scss'],
  host: { class: 'd-block h-100p d-flex flex-column' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffLiveMapComponent implements AfterViewInit {
  @ViewChild('googleMap') googleMap?: GoogleMap;
  $isLoaded: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  markerClustererImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
  dateTimeFormat: string = DATE_TIME_FORMAT;

  searchStaff: UntypedFormControl = new UntypedFormControl(null);
  isMoreThenOneLocation: Subject<boolean> = new Subject<boolean>();
  staffLocations: BehaviorSubject<DeviceLocationDto[] | null> = new BehaviorSubject<DeviceLocationDto[] | null>(null);

  searchedStaffLocation: LocationInput | null = null;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 53.5586941, lng: 9.78774 },
    zoom: 10,
    disableDefaultUI: true,
    styles: analyticsGMapStyle,
  };

  markersAndInformationWindowsHashMap: Map<string, markerAndInformationWindow> = new Map<string, markerAndInformationWindow>();

  markerClusterer!: MarkerClusterer;

  selectOptions: SelectOptions<StaffEntity> = {
    service: this.staffService,
    fields: ['id'],
    join: ['settings||firstName,lastName,staffNumber'],
    sort: ['settings.firstName,ASC', 'settings.lastName,ASC'],
    valueKey: 'id',
    getLabel(item: StaffEntity): string {
      return `${item.settings?.firstName} ${item.settings?.lastName} (${item.settings?.staffNumber})` || '---';
    },
    searchForS(term: string): FilterSearch<StaffEntity>[] {
      const [firstName, lastName] = term.split(' ');

      return [
        {
          $or: [
            {
              ['settings.staffNumber']: { [CondOperator.CONTAINS_LOW]: term },
            },
            {
              ['settings.firstName']: { [CondOperator.CONTAINS_LOW]: firstName },
            },
            {
              ['settings.lastName']: { [CondOperator.CONTAINS_LOW]: firstName || lastName },
            },
          ],
        },
      ];
    },
  };

  constructor(
    private readonly googleMapLoaderService: GoogleMapLoaderService,
    private readonly managerStaff: AppManagerStaffService,
    private readonly staffService: CrudStaffService,
    protected readonly nzNotification: NzNotificationService,
  ) {}

  ngAfterViewInit(): void {
    this.locationsLoader();
    this.onStaffSearch();
  }

  locationsLoader(): void {
    this.googleMapLoaderService.$isLoaded
      .pipe(
        filter(Boolean),
        switchMap(() => interval(15000)),
        startWith(0),
        untilDestroyed(this),
        switchMap((): Observable<StaffLocationLiveMapDto[]> => this.managerStaff.staffsLocations()),
        tap((staffsLocations: StaffLocationLiveMapDto[]) => {
          const map: google.maps.Map | undefined = this.googleMap?.googleMap;
          if (!map) {
            return;
          }

          const newMarkerIDs: Set<string> = this.updateMarkersMap(map, staffsLocations);
          const newAndUpdatedMarkers: google.maps.Marker[] = this.removeMarkersAndGetOthers(newMarkerIDs);
          this.updateClusteredMarkers(map, newAndUpdatedMarkers);
        }),
      )
      .subscribe();
  }

  updateMarkersMap(map: google.maps.Map, staffsLocations: StaffLocationLiveMapDto[]): Set<string> {
    const updatedIDs: Set<string> = new Set<string>();

    for (const { locations, staffId, firstName, lastName, role, staffNumber } of staffsLocations) {
      const staffRole: string = role.toLowerCase();

      for (const { deviceId, lng, lat, updateTime } of locations) {
        const ID: string = `${staffId}.${deviceId}`;
        const staffLocationGMapInput: StaffLocationGMapInput = {
          staffId,
          deviceId,
          firstName,
          lastName,
          staffRole,
          staffNumber,
          updateDateTime: format(new Date(updateTime), this.dateTimeFormat),
          position: { lng, lat },
        };

        if (this.markersAndInformationWindowsHashMap.has(ID)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.updateMarkerInformation(this.markersAndInformationWindowsHashMap.get(ID)!, staffLocationGMapInput);
        } else {
          this.markersAndInformationWindowsHashMap.set(ID, this.createMarker(map, staffLocationGMapInput));
        }
        updatedIDs.add(ID);
      }
    }

    return updatedIDs;
  }

  updateMarkerInformation({ marker, infoWindow }: markerAndInformationWindow, staffLocationGMapInput: StaffLocationGMapInput): void {
    marker.setPosition(staffLocationGMapInput.position);
    infoWindow.setContent(StaffLocationInfoWindowContentHelper(staffLocationGMapInput));
  }

  createMarker(map: google.maps.Map, staffLocationGMapInput: StaffLocationGMapInput): markerAndInformationWindow {
    const marker: google.maps.Marker = new google.maps.Marker({
      map,
      title: `${staffLocationGMapInput.firstName} ${staffLocationGMapInput.lastName} (${staffLocationGMapInput.staffNumber})`,
      position: staffLocationGMapInput.position,
      icon: `../../../../../../assets/img/map-markers/${staffLocationGMapInput.staffRole}-marker.svg`,
      clickable: true,
    });
    const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow({
      content: StaffLocationInfoWindowContentHelper(staffLocationGMapInput),
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    return {
      marker,
      infoWindow,
    };
  }

  removeMarkersAndGetOthers(neededMarkerIDs: Set<string>): google.maps.Marker[] {
    const clusterMarkers: google.maps.Marker[] = [];

    for (const ID of this.markersAndInformationWindowsHashMap.keys()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { marker } = this.markersAndInformationWindowsHashMap.get(ID)!;
      if (neededMarkerIDs.has(ID)) {
        clusterMarkers.push(marker);
      } else {
        marker.setMap(null);
        if (this.markerClusterer) {
          this.markerClusterer.removeMarker(marker, false);
        }
        this.markersAndInformationWindowsHashMap.delete(ID);
      }
    }
    return clusterMarkers;
  }

  updateClusteredMarkers(map: google.maps.Map, clusterMarkers: google.maps.Marker[]): void {
    if (!this.markerClusterer) {
      this.markerClusterer = new MarkerClusterer(map, [], {
        imagePath: this.markerClustererImagePath,
        maxZoom: 15,
      });
    }
    this.markerClusterer.addMarkers(clusterMarkers);
  }

  onStaffSearch(): void {
    this.searchStaff.valueChanges
      .pipe(
        filter(isNonNull),
        switchMap((staffId: string): Observable<DeviceLocationDto[]> => this.managerStaff.findStaffLocations(staffId)),
        tap((locations: DeviceLocationDto[]) => {
          if (!this.googleMap) {
            return;
          }
          if (locations.length === 0) {
            this.nzNotification.warning('Staff Location', 'Location for this staff not found.');
            return;
          }
          if (locations.length === 1) {
            this.googleMap.googleMap?.setCenter(locations[0]);
            this.googleMap.googleMap?.setZoom(16);
            return;
          }
          this.showChooseLocation();
        }),
      )
      .subscribe((locations: DeviceLocationDto[]) => this.staffLocations.next(locations));
  }

  closeChooseLocation(): void {
    this.isMoreThenOneLocation.next(false);
  }

  showChooseLocation(): void {
    this.isMoreThenOneLocation.next(true);
  }

  setMapCenter(): void {
    if (!this.googleMap || !this.searchedStaffLocation) {
      return;
    }
    this.googleMap.googleMap?.setCenter(this.searchedStaffLocation);
    this.googleMap.googleMap?.setZoom(16);

    this.staffLocations.next(null);
    this.searchStaff.patchValue(null);
    this.closeChooseLocation();
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow): void {
    infoWindow.open(marker);
  }
}

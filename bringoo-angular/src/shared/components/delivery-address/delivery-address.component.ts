import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { AppStore } from 'src/shared/api/app-store';
import { AppStoreControllerStoresParams, Iso2Enum, PageableStoreDto, StoreSchedulerDayDto } from 'src/shared/api/data-contracts';
import GeoLocationService from 'src/shared/services/geolocation.service';

import { DeliveryStoreData } from '../../../app/example/components/cards/cards.mock';
@Component({
  selector: 'ui-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryAddressComponent implements OnInit {
  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;
  @Input() mapLoaded: boolean = false;
  @Input() selectedMode: string = '';
  @Output() onChangeDelivery = new EventEmitter<string>();
  @Output() onChangeAddress = new EventEmitter<any>();
  inAccurate: boolean = false;
  deliveryStores: PageableStoreDto | undefined;
  deliverySlots: StoreSchedulerDayDto[] = [];
  deliveryTypes: string[] = [];
  selectedDeliveryType: string = 'Delivery';
  deliveryStoreData = DeliveryStoreData;
  selectedStore: string | undefined;
  selectedSlot: string | undefined;
  mapOpened: boolean = false;
  addressInfo: string = '';
  isGuest: boolean = true;
  latLng: any;
  isCity: boolean = false;
  cities = [
    {
      id: 'humburg',
      text: 'Humburg',
      zipCode: '20303',
      lng: '53.5511',
      lat: '9.9937',
    },
    {
      id: 'berlin',
      text: 'Berlin',
      zipCode: '10115',
      lng: '52.5200',
      lat: '13.4050',
    },
    {
      id: 'munich',
      text: 'Munich',
      zipCode: '80331',
      lng: '48.1351',
      lat: '11.5820',
    },
    {
      id: 'dortmund',
      text: 'Dortmund',
      zipCode: '44135',
      lng: '51.5136',
      lat: '7.4653',
    },
  ];

  options: google.maps.MapOptions = {
    center: { lat: 53.5476, lng: 9.987755 },
    zoom: 8,
    clickableIcons: true,
    panControl: true,
    draggable: true,
    fullscreenControl: true,
    zoomControl: true,
    disableDefaultUI: true,
    draggableCursor: 'url(http://www.example.com/marker.png), auto;',
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral | any;
  postal: string | undefined;
  places: google.maps.places.PlaceResult[] = [];
  httpClient: HttpClient;
  address: any;

  constructor(
    public readonly appStore: AppStore,
    private readonly geoLocationService: GeoLocationService,
    httpClient: HttpClient,
    private ref: ChangeDetectorRef,
  ) {
    if (localStorage.getItem('customerAccessToken')) this.isGuest = false;
    else this.isGuest = true;
    this.httpClient = httpClient;
  }

  onSelectStore(id: string): void {
    this.selectedStore = id;
    // const query: any = {
    //   zipCode: this.postal,
    //   id: id,
    // };
    // this.appStore.getTimeSlots(query).subscribe(
    //   (res: StoreSchedulerDayDto[]) => {
    //     this.ref.detectChanges();
    //   },
    //   (err: any) => {
    //     if (err.status === 401) window.location.href = '/';
    //   },
    // );
  }

  onSelectSlot(): void {
    // this.selectedSlot = id;
  }

  onDeliveryTypeClick(dtype: string): void {
    this.selectedDeliveryType = dtype;
  }

  onLocationClick(): void {
    this.mapOpened = true;
  }

  ngOnInit(): void {
    this.deliveryTypes = ['Delivery', 'Pickup', 'Shipping'];
  }

  onAddressDelete(): void {
    this.addressInfo = '';
  }

  onAddressChange(e: Event): void {
    this.addressInfo = (e.target as HTMLInputElement).value;
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    this.latLng = event.latLng.toJSON();
    this.markerPosition = event.latLng.toJSON();
    this.geoLocationService.getAddress(this.markerPosition).then((res: any) => {
      this.addressInfo = res.results[0].formatted_address;
      this.postal = res.results[0].address_components?.find((item: any) => item.types[0] === 'postal_code')?.long_name;
      this.ref.detectChanges();
    });
  }

  onClickMode(data: any): void {
    this.onChangeAddress.emit(data);
    this.isCity = false;
  }

  onToggleLocation(data: boolean): void {
    this.isCity = data;
  }

  onAddressSearch(): void {
    if (this.places.length === 0) {
      return;
    }
    const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
    this.postal = this.places[0].address_components?.find((item: any) => item.types[0] === 'postal_code')?.long_name;
    this.ref.detectChanges();
    this.places.forEach((place: google.maps.places.PlaceResult) => {
      if (!place.geometry || !place.geometry.location) {
        return;
      }
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.map.fitBounds(bounds);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mapLoaded) {
      if (this.mapLoaded) {
        const searchBox: google.maps.places.SearchBox = new google.maps.places.SearchBox(this.searchField.nativeElement);
        this.map && this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchField.nativeElement);
        searchBox.addListener('places_changed', () => {
          this.places = searchBox.getPlaces();
          if (this.places.length === 0) {
            return;
          }
          const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
          this.postal = this.places[0].address_components?.find(
            (item: google.maps.GeocoderAddressComponent) => item.types[0] === 'postal_code',
          )?.long_name;
          if (this.postal) {
            localStorage.setItem('longitude', `${this.places[0].geometry?.location.lng()}`);
            localStorage.setItem('latitude', `${this.places[0].geometry?.location.lat()}`);
            localStorage.setItem('postal', this.postal);
            localStorage.setItem(
              'countryName',
              `${
                this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'country')
                  ?.long_name
              }`,
            );
            localStorage.setItem(
              'countryCode',
              `${
                this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'country')
                  ?.short_name
              }`,
            );
            localStorage.setItem(
              'city',
              `${
                this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'locality')
                  ?.long_name
              }`,
            );
            localStorage.setItem(
              'streets',
              `${
                this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'street_number')
                  ?.long_name
              }`,
            );
            this.onChangeDelivery.emit(`${localStorage.getItem('city')}, ${localStorage.getItem('countryName')}`);
            this.inAccurate = false;
            const paramsStore: AppStoreControllerStoresParams = {
              lat: 48.4817,
              lng: 135.083,
              zipCode: this.postal,
              countryCode: Iso2Enum.DE,
            };
            this.appStore.stores(paramsStore).subscribe(
              (res: PageableStoreDto) => {
                this.deliveryStores = res;
                this.ref.detectChanges();
              },
              (err: any) => {
                if (err.status === 401) window.location.href = '/';
              },
            );
            this.mapOpened = false;
          } else this.inAccurate = true;
          this.ref.detectChanges();
          this.places.forEach((place: google.maps.places.PlaceResult) => {
            if (!place.geometry || !place.geometry.location) {
              return;
            }
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          this.map.fitBounds(bounds);
        });
        this.ref.detectChanges();
      }
    }
    if (changes.selectedMode) {
      if (this.selectedMode) {
        this.selectedDeliveryType = this.selectedMode;
      }
    }
  }
}

import { ChangeDetectorRef, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { AppCustomerFaq } from 'src/shared/api/app-customer-faq';
import { AppStore } from 'src/shared/api/app-store';
import {
  AppStoreControllerStoreParams,
  AppStoreControllerStoresParams,
  FaqItemDto,
  FaqTopicDto,
  Iso2Enum,
  PageableStoreDto,
  StoreDto,
} from 'src/shared/api/data-contracts';

export type landingCardType = {
  title: string;
  content: string;
  footer: string;
};

@Component({
  selector: 'ui-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss'],
})
export class LandingHomeComponent {
  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;
  @Input() mapLoaded: boolean = false;
  images: string[] = [];
  landingCardData: landingCardType[] = [];
  year: number = new Date().getFullYear();
  searchInfo: string = '';
  options: google.maps.MapOptions = {
    center: { lat: 53.5476, lng: 9.987755 },
    zoom: 8,
  };

  faqs: FaqItemDto[] = [];
  zipCode: string = '';
  stores: StoreDto[] | undefined = [];
  postal: string = '';
  paramsStore: AppStoreControllerStoresParams = {
    lat: 48.4817,
    lng: 135.083,
    zipCode: '22303',
    countryCode: Iso2Enum.DE,
  };

  places: google.maps.places.PlaceResult[] = [];

  constructor(public readonly appStore: AppStore, private ref: ChangeDetectorRef, public readonly appCustomerFaq: AppCustomerFaq) {
    localStorage.setItem('postal', '22303');
    this.postal = localStorage.getItem('postal') ?? '';
    this.appStore.stores(this.paramsStore).subscribe(
      (res: PageableStoreDto) => {
        this.stores = res.data;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.appCustomerFaq.getTopicsWithItems().subscribe(
      (res: FaqTopicDto[]) => {
        this.faqs = res[0].items;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onAddressChange(e: KeyboardEvent): void {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      this.zipCode = (e.target as HTMLInputElement).value;
      this.paramsStore = {
        lat: 48.4817,
        lng: 135.083,
        zipCode: this.zipCode,
        countryCode: Iso2Enum.DE,
      };
      this.appStore.stores(this.paramsStore).subscribe(
        (res: PageableStoreDto) => {
          this.stores = res.data;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
  }

  onStoreSelect(id: string): void {
    const paramsStore: AppStoreControllerStoreParams = {
      id: id,
      zipCode: localStorage.getItem('postal') ?? '',
    };
    this.appStore.store(paramsStore).subscribe(
      (res: StoreDto) => {
        sessionStorage.setItem('store', JSON.stringify(res));
        window.location.href = `/${res.name_public_short_i18n.toLowerCase().split(' ').join('_')}/products`;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  takeCurrentLocation(): void {
    localStorage.setItem('postal', '22303');
    this.paramsStore = {
      lat: 48.4817,
      lng: 135.083,
      zipCode: localStorage.getItem('postal') ?? '',
      countryCode: Iso2Enum.DE,
    };
    this.appStore.stores(this.paramsStore).subscribe(
      (res: PageableStoreDto) => {
        this.stores = res.data;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.ref.detectChanges();
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
          this.postal =
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'postal_code')
              ?.long_name ?? '';
          this.ref.detectChanges();
          this.places.forEach((place: google.maps.places.PlaceResult) => {
            if (!place.geometry || !place.geometry.location) {
              return;
            }
          });
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
            this.paramsStore = {
              lat: 48.4817,
              lng: 135.083,
              zipCode: this.postal,
              countryCode: Iso2Enum.DE,
            };
            this.appStore.stores(this.paramsStore).subscribe(
              (res: PageableStoreDto) => {
                this.stores = res.data;
                this.ref.detectChanges();
              },
              (err: any) => {
                if (err.status === 401) window.location.href = '/';
              },
            );
          }
        });
        this.ref.detectChanges();
      }
    }
  }
}

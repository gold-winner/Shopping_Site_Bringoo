import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { NotifierService } from 'angular-notifier';
import { PaymentMethodData } from 'src/app/example/components/cards/cards.mock';
import { AppCart } from 'src/shared/api/app-cart';
import { CartDto, CheckoutAddressInput, DeliveryDestinationEnum } from 'src/shared/api/data-contracts';
import GeoLocationService from 'src/shared/services/geolocation.service';

import { getWeekData } from '../../../shared/utils/date';
import { DeliveryTimeDropdownData } from '../../example/components/forms/forms.mock';

export type paymentMethodType = {
  id: string;
  imgUrl: string;
  title: string;
};
@Component({
  selector: 'ui-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('mapSearch') searchField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild('mapSearch1') searchField1!: ElementRef;
  @ViewChild(GoogleMap) map1!: GoogleMap;
  deliveryTimeDropdownData = DeliveryTimeDropdownData;
  deliveryDateDropdownData = getWeekData();
  phoneNumber: string = '+49 40 6685 87 00';
  editedPhoneNumber: string = '';
  deliveryAddress: string = 'Ferdinandstraße 32, 20095 Hamburg, Deutschland';
  billingAddress: string = 'Ferdinandstraße 32, 20095 Hamburg, Deutschland';
  paymentMethods: paymentMethodType[] = [];
  selectedPaymentMethod: string | undefined;
  selectedCard: string | undefined;
  cartDetailInfo: CartDto | undefined;
  cardData = PaymentMethodData;
  storeData: any = '';
  phoneModal: boolean = false;
  voucherModal: boolean = false;
  orderModal: boolean = false;
  billingAddressModal: boolean = false;
  deliveryAddressModal: boolean = false;
  cardModal: boolean = false;
  cardList: boolean = false;
  enabled: boolean = true;
  latLng: any;
  options: google.maps.MapOptions = {
    center: { lat: 53.5476, lng: 9.987755 },
    zoom: 8,
    clickableIcons: true,
    panControl: true,
    draggable: true,
    draggableCursor: 'url(http://www.example.com/marker.png), auto;',
  };

  topAddInfo: string = '';
  addressInfo: string = '';
  places: google.maps.places.PlaceResult[] = [];
  postal: string | undefined;
  errorCode: number | undefined;
  location: string = '';
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral | any;
  mapLoaded: boolean = false;
  billingAddressInfo: string = '';
  deliveryAddressInfo: string = '';
  storeUrl: string = '';
  id: string = '';
  dAddress: CheckoutAddressInput | undefined;
  bAddress: CheckoutAddressInput | undefined;
  phoneCode: string = '+49';
  destination: string = DeliveryDestinationEnum.HOME;
  private notifier: NotifierService;

  constructor(
    httpClient: HttpClient,
    private readonly geoLocationService: GeoLocationService,
    private ref: ChangeDetectorRef,
    public readonly appCart: AppCart,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
    this.storeData = JSON.parse(sessionStorage.getItem('store') ?? '');
    this.storeUrl =
      `${JSON.parse(sessionStorage.getItem('store') ?? '')
        .name_public_short_i18n.toLowerCase()
        .split(' ')
        .join('_')}/` + `products`;
    // this.geoLocationService.getLocation().then(
    //   (res: LocationData) => {
    //     this.errorCode = 200;
    //     this.location = `${res.city}, ${res.country_name}`;
    //     this.ref.detectChanges();
    //   },
    //   (error: number) => {
    //     this.errorCode = error;
    //   },
    // );
    localStorage.setItem('longitude', '53.5511');
    localStorage.setItem('latitude', '9.9937');
    localStorage.setItem('postal', '22303');
    localStorage.setItem('countryCode', 'DE');
    localStorage.setItem('city', 'hamburg');
    localStorage.setItem('streets', 'hamburg');
    localStorage.setItem('countryName', 'Germany');
    this.location = 'Hamburg, Germany';
    this.errorCode = 200;

    const store: any = JSON.parse(sessionStorage.store);
    this.appCart.cartDetails(store.id).subscribe(
      (res: CartDto) => {
        this.cartDetailInfo = res;
        this.id = res.id;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onChangePhoneNumberClick(): void {
    this.phoneModal = true;
    this.editedPhoneNumber = this.phoneNumber;
  }

  onChangePhoneNumber(): void {
    this.phoneNumber = this.editedPhoneNumber;
    this.phoneModal = false;
  }

  onChangeDeliveryAddressClick(): void {
    this.deliveryAddressModal = true;
  }

  onChangeDeliveryAddress(): void {
    this.deliveryAddress = this.places[0]?.formatted_address ? this.places[0]?.formatted_address : '';
    this.deliveryAddressModal = false;
    this.ref.detectChanges();
  }

  onChangeBillingAddressClick(): void {
    this.billingAddressModal = true;
  }

  onChangeBillingAddress(): void {
    this.billingAddress = this.places[0]?.formatted_address ? this.places[0]?.formatted_address : '';
    this.billingAddressModal = false;
    this.ref.detectChanges();
  }

  onAddnewCard(): void {
    this.cardModal = true;
  }

  onAddVoucherClick(): void {
    this.voucherModal = true;
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

  onBillingAddressChange(e: Event): void {
    this.billingAddressInfo = (e.target as HTMLInputElement).value;
  }

  onDeliveryAddressChange(e: Event): void {
    this.deliveryAddressInfo = (e.target as HTMLInputElement).value;
  }

  onGoogleMap(event: boolean): void {
    this.mapLoaded = event;
    if (this.mapLoaded) {
      //delivery address
      const searchBox: google.maps.places.SearchBox = new google.maps.places.SearchBox(this.searchField.nativeElement);
      this.map && this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchField.nativeElement);
      searchBox.addListener('places_changed', () => {
        this.places = searchBox.getPlaces();
        if (this.places.length === 0) {
          return;
        }
        this.dAddress = {
          streets: [
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'sublocality_level_1')
              ?.long_name ?? '',
          ],
          countryCode:
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'country')
              ?.short_name ?? '',
          city:
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'locality')
              ?.long_name ?? '',
          zipCode:
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'postal_code')
              ?.long_name ?? '',
          location: {
            lat: this.places[0].geometry?.location.lat() ?? 0,
            lng: this.places[0].geometry?.location.lng() ?? 0,
          },
        };
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
          this.topAddInfo = `${localStorage.getItem('city')}, ${localStorage.getItem('countryName')}`;
        }
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
      //billing address
      const searchBox1: google.maps.places.SearchBox = new google.maps.places.SearchBox(this.searchField1.nativeElement);
      this.map1 && this.map1.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchField1.nativeElement);
      searchBox1.addListener('places_changed', () => {
        this.places = searchBox1.getPlaces();
        if (this.places.length === 0) {
          return;
        }
        this.bAddress = {
          streets: [
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'sublocality_level_1')
              ?.long_name ?? '',
          ],
          countryCode:
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'country')
              ?.short_name ?? '',
          city:
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'locality')
              ?.long_name ?? '',
          zipCode:
            this.places[0].address_components?.find((item: google.maps.GeocoderAddressComponent) => item.types[0] === 'postal_code')
              ?.long_name ?? '',
          location: {
            lat: this.places[0].geometry?.location.lat() ?? 0,
            lng: this.places[0].geometry?.location.lng() ?? 0,
          },
        };
        this.postal = this.places[0].address_components?.find(
          (item: google.maps.GeocoderAddressComponent) => item.types[0] === 'postal_code',
        )?.long_name;
      });
    }
    this.ref.detectChanges();
  }

  onStateChange(mode: string): void {
    mode === 'first' ? (this.destination = DeliveryDestinationEnum.HOME) : (this.destination = DeliveryDestinationEnum.NEIGHBOUR);
  }

  onEnterPhone(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.onChangePhoneNumber();
    }
  }

  onClickPay(): void {
    if (
      this.id !== '' &&
      this.dAddress !== undefined &&
      this.bAddress !== undefined &&
      this.phoneCode !== '' &&
      this.phoneNumber !== '' &&
      this.destination !== ''
    )
      this.orderModal = true;
    else this.notifier.notify('error', 'Please check all infos for payment');
  }

  ngOnInit(): void {
    this.paymentMethods = [
      {
        id: '1',
        imgUrl: 'creditcard.png',
        title: 'Credit card',
      },
      {
        id: '2',
        imgUrl: 'paypal.png',
        title: 'Paypal',
      },
      {
        id: '3',
        imgUrl: 'cash.png',
        title: 'Cash',
      },
      {
        id: '4',
        imgUrl: 'sepa.png',
        title: 'Sepa',
      },
    ];
  }
}

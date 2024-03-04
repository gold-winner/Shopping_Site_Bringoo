import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MapGeocoder } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';

import { CrudCountryService } from '../../../../../../../../shared/api/auth/crud-country.service';
import {
  AddressTypeEnum,
  CountryEntity,
  CustomerAddressCreateInput,
  LocationDto,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { AddressInformationFromGoogleGeocoderResult } from '../../../../../../../../shared/helpers/address-information-from-google-geocoder-result';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { GoogleMapLoaderService } from '../../../../../../../../shared/services/google-map-loader.service';
import { AddressFromGoogleResult } from '../../../../../../../../shared/types/address-from-gogle-result.type';
import { CustomerIdService } from '../../../../../../../orders/modules/orders-table/components/order-create/components/services/customer-id-service';
import GeocoderResult = google.maps.GeocoderResult;

@UntilDestroy()
@Component({
  selector: 'app-customer-address-create-form',
  templateUrl: './customer-address-create-form.component.html',
  styleUrls: ['./customer-address-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressCreateFormComponent extends DynamicForm<CustomerAddressCreateInput> {
  $isLoaded: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  defaultFormValue: Partial<CustomerAddressCreateInput> = {
    customerId: this.route.snapshot.params['id'],
    isDefault: false,
  };

  mapCenter: LocationDto = { lat: 53.5586941, lng: 9.78774 };

  mapOptions: google.maps.MapOptions = {
    zoom: 10,
    disableDefaultUI: true,
  };

  addressTypeList: string[] = Object.keys(AddressTypeEnum);

  markerLocationSubject: Subject<LocationDto> = new Subject<LocationDto>();
  searchResultSubject: Subject<google.maps.places.PlaceResult> = new Subject<google.maps.places.PlaceResult>();
  addressSearchingControl: UntypedFormControl = new UntypedFormControl(null);
  showError: Subject<boolean> = new Subject<boolean>();

  countryCodeSelect: SelectOptions<CountryEntity> = {
    service: this.crudCountryService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: CountryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly geocoder: MapGeocoder,
    private customerIdService: CustomerIdService,
    private readonly crudCountryService: CrudCountryService,
    private readonly googleMapLoaderService: GoogleMapLoaderService,
  ) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      customerId: [null, [Validators.required]],
      addressName: [null, [Validators.required]],
      addressType: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      streetName: [null, [Validators.required]],
      streetNumber: [null, [Validators.required]],
      floorNumber: [null, []],
      apartmentNumber: [null, []],
      state: [null, []],
      organizationName: [null],
      organizationTaxId: [null],
      location: this.fb.group({
        lat: [null, [Validators.required]],
        lng: [null, [Validators.required]],
      }),
      isDefault: [null, [Validators.required]],
    });
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    const location: LocationDto | undefined = event.latLng?.toJSON();
    this.form.patchValue({ location });
    this.markerLocationSubject.next(location);
  }

  patchAddressInformation(result: GeocoderResult, location: LocationDto): void {
    this.showError.next(false);

    const createAddress: CustomerAddressCreateInput = {
      ...this.form.value,
      location,
      ...AddressInformationFromGoogleGeocoderResult(result),
    };
    this.form.patchValue(createAddress);
  }

  onInputUpdateLocation(location: LocationDto): void {
    this.markerLocationSubject.next(location);
    this.form.patchValue({ location });
  }

  onInputUpdateAddressInformation(addressData: AddressFromGoogleResult): void {
    this.form.patchValue({ ...addressData });
  }

  onInputPlaceResultInformation(result: google.maps.places.PlaceResult): void {
    this.searchResultSubject.next(result);
  }

  onErrorLocation(): void {
    this.showError.next(true);
  }
}

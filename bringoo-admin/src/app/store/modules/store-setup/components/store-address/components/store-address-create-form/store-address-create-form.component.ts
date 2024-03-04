import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { CrudCountryService } from '../../../../../../../../shared/api/auth/crud-country.service';
import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import {
  CountryEntity,
  LocationDto,
  StoreAddressCreateInput,
  StoreAddressTypeEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { GoogleMapLoaderService } from '../../../../../../../../shared/services/google-map-loader.service';
import { AddressFromGoogleResult } from '../../../../../../../../shared/types/address-from-gogle-result.type';

@Component({
  selector: 'app-store-address-create-form',
  templateUrl: './store-address-create-form.component.html',
  styleUrls: ['store-address-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreAddressCreateFormComponent extends DynamicForm<StoreAddressCreateInput> {
  $isLoaded: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  storeAddressTypeList: string[] = Object.keys(StoreAddressTypeEnum);

  defaultFormValue: Partial<StoreAddressCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
  };

  markerLocationSubject: Subject<LocationDto> = new Subject<LocationDto>();
  searchResultSubject: Subject<google.maps.places.PlaceResult> = new Subject<google.maps.places.PlaceResult>();
  addressSearchingControl: UntypedFormControl = new UntypedFormControl(null);
  showError: Subject<boolean> = new Subject<boolean>();

  mapCenter: LocationDto = { lat: 53.5586941, lng: 9.78774 };

  mapOptions: google.maps.MapOptions = {
    zoom: 10,
    disableDefaultUI: true,
  };

  constructor(
    private fb: UntypedFormBuilder,
    private readonly crudCountryService: CrudCountryService,
    private readonly crudStoreService: CrudStoreService,
    private readonly route: ActivatedRoute,
    private readonly googleMapLoaderService: GoogleMapLoaderService,
  ) {
    super();
    this.buildForm();
  }

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

  buildForm(): void {
    this.form = this.fb.group({
      addressType: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      gln: [null, []],
      streetName: [null, [Validators.required]],
      streetNumber: [null, [Validators.required]],
      storeId: [null, [Validators.required]],
      floorNumber: [null, []],
      apartmentNumber: [null, []],
      state: [null, []],
      location: this.fb.group({
        lat: [null, [Validators.required]],
        lng: [null, [Validators.required]],
      }),
    });
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    const location: LocationDto | undefined = event.latLng?.toJSON();
    this.form.patchValue({ location });
    this.markerLocationSubject.next(location);
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

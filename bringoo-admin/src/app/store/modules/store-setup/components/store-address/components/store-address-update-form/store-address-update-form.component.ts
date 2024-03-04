import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { CrudCountryService } from '../../../../../../../../shared/api/auth/crud-country.service';
import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import {
  CountryEntity,
  LocationDto,
  StoreAddressCreateInput,
  StoreAddressTypeEnum,
  StoreAddressUpdateInput,
  StoreEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { GoogleMapLoaderService } from '../../../../../../../../shared/services/google-map-loader.service';
import { AddressFromGoogleResult } from '../../../../../../../../shared/types/address-from-gogle-result.type';

@Component({
  selector: 'app-store-address-update-form',
  templateUrl: './store-address-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreAddressUpdateFormComponent extends DynamicForm<StoreAddressUpdateInput> {
  $isLoaded: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  storeAddressTypeList: string[] = Object.keys(StoreAddressTypeEnum);

  markerLocationSubject: BehaviorSubject<LocationDto | null> = new BehaviorSubject<LocationDto | null>(null);

  initLocation!: LocationDto;
  mapCenterSubject: BehaviorSubject<LocationDto> = new BehaviorSubject<LocationDto>({ lat: 53.5586941, lng: 9.78774 });

  addressSearchingControl: UntypedFormControl = new UntypedFormControl(null);
  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  };

  showError: Subject<boolean> = new Subject<boolean>();
  isInit: boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly crudCountryService: CrudCountryService,
    private readonly crudStoreService: CrudStoreService,
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

  storeIdList: SelectOptions<StoreEntity> = {
    service: this.crudStoreService,
    fields: ['name_i18n', 'id'],
    valueKey: 'id',
    getLabel(item: StoreEntity): string {
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

  beforePatch(value: StoreAddressUpdateInput): StoreAddressUpdateInput {
    if (value.location) {
      this.markerLocationSubject.next(value.location);
      this.mapCenterSubject.next(value.location);
      this.initLocation = value.location;
      this.isInit = true;
    }
    return super.beforePatch(value);
  }

  beforeSubmit(value: StoreAddressCreateInput): StoreAddressCreateInput {
    const formValues: StoreAddressCreateInput & any = value;
    let ind: keyof typeof value;
    for (ind in value) {
      if (!this.form?.get(ind)?.dirty) delete formValues[ind];
    }

    return formValues;
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    const location: LocationDto | undefined = event.latLng?.toJSON();
    if (location) {
      this.form.patchValue({ location });
      this.markerLocationSubject.next(location);
    }
  }

  onInputUpdateLocation(location: LocationDto): void {
    this.markerLocationSubject.next(location);
    this.form.patchValue({ location });
  }

  onInputUpdateAddressInformation(addressData: AddressFromGoogleResult): void {
    if (this.isInit) {
      this.isInit = false;
      return;
    }
    this.form.patchValue(addressData);
  }

  onErrorLocation(): void {
    this.showError.next(true);
  }
}

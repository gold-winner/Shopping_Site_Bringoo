import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppCustomer } from 'src/shared/api/app-customer';
import { AddressCreateInput, AddressTypeEnum, CustomerAddressDto } from 'src/shared/api/data-contracts';
@Component({
  selector: 'ui-settings-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class SettingsAddAddressComponent {
  address: string = '';
  street: string = '';
  plz: string = '';
  city: string = '';
  error_address: boolean = false;
  error_street: boolean = false;
  error_plz: boolean = false;
  error_city: boolean = false;
  loading: boolean = false;
  @Input() addressInfo: CustomerAddressDto | undefined;
  @Input() isSave: boolean = false;
  @Output() onClickSave = new EventEmitter<AddressCreateInput>();

  constructor(private ref: ChangeDetectorRef, public readonly appCustomer: AppCustomer) {
    this.loading = false;
  }

  init(): void {
    this.error_address = false;
    this.error_street = false;
    this.error_plz = false;
    this.error_city = false;
  }

  onEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.onSaveClick('C');
    }
  }

  onSaveClick(mode: string): void {
    this.loading = false;
    this.ref.detectChanges();
    this.init();
    if (this.address === '') {
      this.error_address = true;
    } else if (this.street === '') {
      this.error_street = true;
    } else if (this.plz === '') {
      this.error_plz = true;
    } else if (this.city === '') {
      this.error_city = true;
    } else {
      this.loading = true;
      const data: any = {
        addressName: this.address,
        addressType: AddressTypeEnum.DELIVERY,
        streets: [this.street],
        countryCode: 'DE',
        city: this.city,
        zipCode: this.plz,
        location: {
          lat: 23,
          lng: 134,
        },
        mode: mode,
      };
      this.onClickSave.emit(data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addressInfo) {
      if (this.addressInfo) {
        this.address = this.addressInfo.addressName;
        this.street = this.addressInfo.streets[0];
        this.plz = this.addressInfo.zipCode;
        this.city = this.addressInfo.city;
      } else {
        this.address = '';
        this.street = '';
        this.plz = '';
        this.city = '';
      }
    }
    if (changes.isSave) {
      if (this.isSave) {
        this.loading = false;
      }
    }
    this.ref.detectChanges();
  }
}

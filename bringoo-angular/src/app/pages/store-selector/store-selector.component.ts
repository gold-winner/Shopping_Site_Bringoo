import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppStore } from 'src/shared/api/app-store';
import {
  AppStoreControllerStoreParams,
  AppStoreControllerStoresParams,
  AppStoreControllerVendorTypesParams,
  Iso2Enum,
  PageableStoreDto,
  PageableVendorTypesDto,
  StoreDto,
  VendorTypeDto,
} from 'src/shared/api/data-contracts';
import { IOption } from 'src/shared/components';

@Component({
  selector: 'ui-store-selector',
  templateUrl: './store-selector.component.html',
  styleUrls: ['./store-selector.component.scss'],
})
export class StoreSelectorComponent implements OnInit {
  selectedOption: string = 'all';
  options: IOption[] = [];
  all_stores: StoreDto[] | undefined = [];
  filtered_stores: StoreDto[] | undefined = [];
  total: number = 0;
  favorites: number = 0;
  storeName: string = '';
  paramsVendor: AppStoreControllerVendorTypesParams = {
    // lat: 48.4817,
    // lng: 135.083,
    // lat: localStorage.getItem("longitude"),
    // lng: localStorage.getItem("latitude"),
  };

  isFound: boolean = true;
  paramsStore: AppStoreControllerStoresParams = {
    lat: 48.4817,
    lng: 135.083,
    zipCode: localStorage.getItem('postal') ?? '',
    countryCode: Iso2Enum.DE,
    // lat: localStorage.getItem("longitude"),
    // lng: localStorage.getItem("latitude"),
    // zipCode: localStorage.getItem("postal"),
    // countryCode: localStorage.getItem("countryCode"),
  };

  constructor(public readonly appStore: AppStore, private ref: ChangeDetectorRef) {
    this.appStore.vendorTypes(this.paramsVendor).subscribe(
      (res: PageableVendorTypesDto) => {
        res.data?.map((data: VendorTypeDto, index: number) => {
          this.options[index] = { id: data.id, label: data.name_i18n };
        });
        this.options = [{ id: 'all', label: 'All' }].concat(this.options);
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.appStore.stores(this.paramsStore).subscribe(
      (res: PageableStoreDto) => {
        this.all_stores = res.data;
        this.filtered_stores = res.data;
        if (this.filtered_stores?.length === 0) this.isFound = false;
        else this.isFound = true;
        this.total = res.total;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onChangeOption(option: string): void {
    this.selectedOption = option;
    this.filtered_stores = this.all_stores?.filter((item: StoreDto) => {
      return item.vendorType.code === this.selectedOption;
    });
    if (option === 'all') {
      this.filtered_stores = this.all_stores;
    }
    if (this.filtered_stores?.length === 0) this.isFound = false;
    else this.isFound = true;
    this.ref.detectChanges();
  }

  onStoreClick(id: string): void {
    const paramsStore: AppStoreControllerStoreParams = {
      id: id,
      zipCode: localStorage.getItem('postal') ?? '',
    };
    this.appStore.store(paramsStore).subscribe(
      (res: StoreDto) => {
        sessionStorage.setItem('store', JSON.stringify(res));
        this.storeName = JSON.parse(sessionStorage.getItem('store') ?? '')
          .name_public_short_i18n.toLowerCase()
          .split(' ')
          .join('_');
        const url: string = `/${this.storeName}/products`;
        window.location.href = url;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onPickupClick(id: string): void {
    this.onStoreClick(id);
  }

  onDeliveryClick(): void {}

  ngOnInit(): void {}
}

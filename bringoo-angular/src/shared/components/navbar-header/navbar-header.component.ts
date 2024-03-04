import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.scss'],
})
export class NavbarHeaderComponent {
  @Input() shopCount: number = 0;
  @Input() addData: any | undefined;
  @Output() onAddressClick = new EventEmitter<string>();
  location: string = '';
  enableStore: boolean = true;
  allShop: number = 0;
  storeUrl: string = '/';
  close: boolean = false;

  constructor(private ref: ChangeDetectorRef, public route: Router) {
    if (route.url.includes('store-selector')) {
      this.enableStore = false;
    } else {
      this.storeUrl =
        `${JSON.parse(sessionStorage.getItem('store') ?? '')
          .name_public_short_i18n.toLowerCase()
          .split(' ')
          .join('_')}/` + `products`;
    }
    if (!localStorage.getItem('longitude') && !localStorage.getItem('latitude')) {
      // this.geoLocationService.getLocation().then((res: LocationData) => {
      //   localStorage.setItem('longitude', res.longitude.toString());
      //   localStorage.setItem('latitude', res.latitude.toString());
      //   localStorage.setItem('postal', res.postal);
      //   localStorage.setItem('countryCode', res.country_code);
      //   localStorage.setItem('city', res.city);
      //   localStorage.setItem('streets', res.region);
      //   localStorage.setItem('countryName', res.country_name);
      //   this.location = `${res.city}, ${res.country_name}`;
      //   this.ref.detectChanges();
      // });
      localStorage.setItem('longitude', '53.5511');
      localStorage.setItem('latitude', '9.9937');
      localStorage.setItem('postal', '22303');
      localStorage.setItem('countryCode', 'DE');
      localStorage.setItem('city', 'hamburg');
      localStorage.setItem('streets', 'hamburg');
      localStorage.setItem('countryName', 'Germany');
      this.location = 'Hamburg, Germany';
      this.ref.detectChanges();
    } else {
      this.location = `${localStorage.getItem('countryName')}, ${localStorage.getItem('city')}`;
    }
  }

  onClickClose(): void {
    this.close = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.shopCount) {
      if (this.shopCount !== 0) {
        this.allShop = this.shopCount;
      }
    } else if (changes.addData) {
      if (this.addData) {
        localStorage.setItem('longitude', this.addData.lng);
        localStorage.setItem('latitude', this.addData.lat);
        localStorage.setItem('postal', this.addData.zipCode);
        localStorage.setItem('countryCode', 'DE');
        localStorage.setItem('city', this.addData.text);
        localStorage.setItem('streets', this.addData.text);
        localStorage.setItem('countryName', 'Germany');
        this.location = `Germany, ${localStorage.getItem('city')}`;
      }
    }
    this.ref.detectChanges();
  }
}

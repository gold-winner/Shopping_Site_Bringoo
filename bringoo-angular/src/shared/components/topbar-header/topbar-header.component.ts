import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

// import { LocationData } from '../../services/geolocation.service';
@Component({
  selector: 'ui-topbar-header',
  templateUrl: './topbar-header.component.html',
  styleUrls: ['./topbar-header.component.scss'],
})
export class TopbarHeaderComponent {
  @Input() addInfo: string = '';
  @Output() onAddressClick = new EventEmitter<string>();
  location: string = '';
  enableStore: boolean = true;
  constructor(private ref: ChangeDetectorRef, public route: Router) {
    if (route.url.includes('store-selector')) {
      this.enableStore = false;
    }
    if (!localStorage.getItem('longitude') && !localStorage.getItem('latitude')) {
      localStorage.setItem('longitude', '53.5511');
      localStorage.setItem('latitude', '9.9937');
      localStorage.setItem('postal', '22303');
      localStorage.setItem('countryCode', 'DE');
      localStorage.setItem('city', 'hamburg');
      localStorage.setItem('streets', 'hamburg');
      localStorage.setItem('countryName', 'Germany');
      this.location = 'Hamburg, Germany';
      // this.geoLocationService.getLocation().then((res: LocationData) => {
      // localStorage.setItem('longitude', res.longitude.toString());
      // localStorage.setItem('latitude', res.latitude.toString());
      // localStorage.setItem('postal', res.postal);
      // localStorage.setItem('countryCode', res.country_code);
      // localStorage.setItem('city', res.city);
      // localStorage.setItem('streets', res.region);
      // localStorage.setItem('countryName', res.country_name);
      // this.location = `${res.city}, ${res.country_name}`;
      // this.ref.detectChanges();
      // });
    } else {
      this.location = `${localStorage.getItem('countryName')}, ${localStorage.getItem('city')}`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addInfo) {
      if (this.addInfo) {
        this.location = this.addInfo;
      }
    }
  }
}

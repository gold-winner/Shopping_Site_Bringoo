import { Component, Input, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { StoreDto } from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
})
export class ShopDetailComponent {
  @Input() shopDetail: StoreDto | undefined;
  errorCode: number | undefined;
  location: string = '';

  constructor(private ref: ChangeDetectorRef) {
    // this.geoLocationService.getLocation().then(
    //   (res: LocationData) => {
    //     this.errorCode = 200;
    //     this.location = res.city;
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.shopDetail) {
      if (this.shopDetail) {
        this.ref.detectChanges();
      }
    }
  }
}

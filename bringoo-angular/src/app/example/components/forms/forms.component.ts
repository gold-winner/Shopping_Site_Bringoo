import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { getWeekData } from '../../../../shared/utils/date';
import { DefaultDropDownData, DeliveryTimeDropdownData } from './forms.mock';
@Component({
  selector: 'ui-forms',
  templateUrl: './forms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsComponent {
  defaultDropdownData = DefaultDropDownData;
  deliveryTimeDropdownData = DeliveryTimeDropdownData;
  deliveryDateDropdownData = getWeekData();
  errorCode: number | undefined;
  location: string = '';

  constructor(private ref: ChangeDetectorRef) {
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
  }
}

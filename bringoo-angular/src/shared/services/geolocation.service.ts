import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiMapService } from '../services/api-map.service';

export interface LocationData {
  ip: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export interface AddressData {
  plus_code: any;
  results: [];
}
@Injectable({
  providedIn: 'root',
})
export default class GeoLocationService extends ApiMapService {
  protected url = '';
  CustomergeoLocation = (): Observable<LocationData> => this.request<LocationData, ''>(`https://ipapi.co/json`, 'GET', '');
  CustomerAddress = (marker: any): Observable<AddressData> =>
    this.request<AddressData, ''>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=AIzaSyDs_JyEVBPXVxUM_hIfOwmOlsq9NNAWZhY`,
      'GET',
      '',
    );

  getLocation(): Promise<LocationData> {
    return new Promise((resolve: (value: LocationData) => void, reject: (value: number) => void) => {
      this.CustomergeoLocation().subscribe(
        (res: LocationData) => {
          resolve(res);
        },
        (err: any) => {
          reject(err.status);
        },
      );
    });
  }

  getAddress(marker: any): Promise<any> {
    return new Promise((resolve: (value: AddressData) => void, reject: (value: any) => void) => {
      this.CustomerAddress(marker).subscribe(
        (res: AddressData) => {
          resolve(res);
        },
        (err: any) => {
          reject(err.status);
        },
      );
    });
  }
}

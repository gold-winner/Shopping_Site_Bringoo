import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { BehaviorSubject, Observable } from 'rxjs';

// @ts-ignore
window.MarkerClusterer = MarkerClusterer;

@Injectable({
  providedIn: 'root',
})
export class GoogleMapLoaderService {
  jsonpData: any;
  private mapLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  $isLoaded: Observable<boolean> = this.mapLoaded.asObservable();

  get isLoaded(): boolean {
    return this.mapLoaded.getValue();
  }

  constructor(private readonly httpClient: HttpClient) {
    httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDs_JyEVBPXVxUM_hIfOwmOlsq9NNAWZhY&libraries=places,geometry', 'callback')
      .subscribe((res: Object) => {
        this.jsonpData = res;
        this.mapLoaded.next(true);
      });
  }
}

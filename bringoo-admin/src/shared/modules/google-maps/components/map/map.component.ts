import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { GoogleMapLoaderService } from '../../../../services/google-map-loader.service';

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
})
export class MapComponent {
  $isLoaded: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  @Input() mapOptions: google.maps.MapOptions = {
    center: { lat: 53.5586941, lng: 9.78774 },
    zoom: 10,
    disableDefaultUI: true,
  };

  gg: google.maps.MarkerOptions = {
    position: { lat: 53.5586941, lng: 9.78774 },
  };

  @Input() width: string = '100%';
  @Input() height: string = '500px';
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerClustererImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  constructor(private readonly googleMapLoaderService: GoogleMapLoaderService) {}
}

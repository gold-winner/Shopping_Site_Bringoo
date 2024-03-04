import { Pipe, PipeTransform } from '@angular/core';

import { LocationInput } from '../api/auth/data-contracts';

@Pipe({ name: 'getMarkerOption' })
export class GetMarkerOptionPipe implements PipeTransform {
  transform(
    location: LocationInput,
    iconUrl?: string | null,
    options?: google.maps.MarkerOptions | null,
    size?: { width: number; height: number },
  ): google.maps.MarkerOptions {
    return {
      icon: {
        url: iconUrl ? iconUrl : '../../../../../../assets/img/map-markers/green-marker.svg',
        ...(!size && { anchor: new google.maps.Point(20, 35) }),
        ...(size && { scaledSize: new google.maps.Size(size.width, size.height) }),
      },
      position: {
        lat: location ? location.lat : 0,
        lng: location ? location.lng : 0,
      },
      clickable: true,
      ...(options && { ...options }),
    };
  }
}

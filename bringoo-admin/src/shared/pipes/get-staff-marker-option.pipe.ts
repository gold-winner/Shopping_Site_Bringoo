import { Pipe, PipeTransform } from '@angular/core';

import { DeviceLocationDto, StaffLocationLiveMapDto } from '../api/auth/data-contracts';

@Pipe({ name: 'getStaffMarkerOption' })
export class GetStaffMarkerOptionPipe implements PipeTransform {
  transform({ lat, lng, deviceId }: DeviceLocationDto, { role, firstName, lastName }: StaffLocationLiveMapDto): google.maps.MarkerOptions {
    return {
      icon: `../../../../../../assets/img/map-markers/${role.toLowerCase()}-marker.svg`,
      position: {
        lat,
        lng,
      },
      clickable: true,
      title: `${firstName} ${lastName} (${deviceId})`,
    };
  }
}

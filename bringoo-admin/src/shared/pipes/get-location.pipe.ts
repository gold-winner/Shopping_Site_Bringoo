import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, ɵValue } from '@angular/forms';

import { LocationInput } from '../api/auth/data-contracts';
import { ToFormGroupType } from '../types/to-form-group.type';

@Pipe({ name: 'location' })
export class GetLocationPipe implements PipeTransform {
  transform(location?: LocationInput | null | ɵValue<FormGroup<ToFormGroupType<LocationInput>>>): LocationInput | undefined {
    if (!location || !location.lat || !location.lng) return;
    return {
      lat: location.lat,
      lng: location.lng,
    };
  }
}

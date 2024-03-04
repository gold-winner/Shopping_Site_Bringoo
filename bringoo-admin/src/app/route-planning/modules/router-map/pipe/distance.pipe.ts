import { Pipe, PipeTransform } from '@angular/core';

import { LocationDto } from '../../../../../shared/api/auth/data-contracts';
import { MeasurementEnum } from '../../../../../shared/enums/measurement.enum';

@Pipe({ name: 'distance' })
export class DistancePipe implements PipeTransform {
  transform(
    location?: LocationDto | null,
    location2?: LocationDto | null,
    measurement: MeasurementEnum = MeasurementEnum.METER,
  ): number | string {
    if (!location2 || !location) return 0;

    let distance: number = window?.google?.maps?.geometry?.spherical?.computeDistanceBetween(location, location2) ?? 0;

    if (distance > 1010 && measurement === MeasurementEnum.METER) {
      measurement = MeasurementEnum.KILOMETER;
    }

    switch (measurement) {
      case MeasurementEnum.KILOMETER: {
        distance = distance / 1000;
        break;
      }
    }

    return `${distance.toFixed(2)} ${measurement.toLowerCase()}`;
  }
}

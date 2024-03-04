import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDistance' })
export class FormatDistancePipe implements PipeTransform {
  transform(meters: number): string {
    return meters > 100 ? `${(meters / 1000).toFixed(2)} km` : `${meters} m`;
  }
}

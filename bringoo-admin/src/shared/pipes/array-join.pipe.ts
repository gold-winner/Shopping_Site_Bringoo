import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayJoin' })
export class ArrayJoinPipe implements PipeTransform {
  transform<T>(items: T[], separator: string): string {
    return items.join(separator);
  }
}

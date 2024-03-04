import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayObjectMap' })
export class ArrayObjectMapPipe implements PipeTransform {
  transform<T, K extends keyof T>(objects: T[], key: K): T[K][] {
    return objects.map((obj: T) => obj[key]);
  }
}

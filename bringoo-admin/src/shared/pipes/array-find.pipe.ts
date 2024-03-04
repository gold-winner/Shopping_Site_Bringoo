import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayFind' })
export class ArrayFindPipe implements PipeTransform {
  transform<T>(items: T[], key: keyof T, value: any): T | undefined {
    return items.find((item: T) => item[key] === value);
  }
}

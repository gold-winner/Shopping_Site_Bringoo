import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'include' })
export class IncludePipe implements PipeTransform {
  transform(value: string | undefined | null, searchValue: string, lowerCase: boolean = false): boolean {
    if (value) {
      if (lowerCase) {
        value = value.toLowerCase();
        searchValue = searchValue.toLowerCase();
      }

      return value.includes(searchValue);
    }
    return false;
  }
}

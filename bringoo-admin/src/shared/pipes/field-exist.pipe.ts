import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getFieldFromObject' })
export class FieldExistPipe implements PipeTransform {
  transform(obj: any, field: string): any | boolean {
    return obj[field] ?? false;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'objectValue' })
export class ObjectValuePipe implements PipeTransform {
  transform(item: Object, key: string): any {
    return (item as Record<string, any>)[key];
  }
}

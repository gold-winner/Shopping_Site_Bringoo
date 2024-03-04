import { Pipe, PipeTransform } from '@angular/core';

import { CrudColumn, EntityValue } from '../interfaces/crud-column';

@Pipe({
  name: 'entityValue',
})
export class EntityValuePipe implements PipeTransform {
  transform<T>(item: T, column: CrudColumn<T>): EntityValue {
    const value: unknown = column.getField(item);
    if (typeof value === 'string') {
      return value as string;
    }
    if (typeof value === 'boolean') {
      return value as boolean;
    }

    if (typeof value === 'number') {
      return value as number;
    }

    return value;
  }
}

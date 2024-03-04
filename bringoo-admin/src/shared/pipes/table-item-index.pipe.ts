import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tableItemIndex' })
export class TableItemIndexPipe implements PipeTransform {
  transform(index: number, page: number, pageLimit: number): number {
    return index + (page - 1) * pageLimit + 1;
  }
}

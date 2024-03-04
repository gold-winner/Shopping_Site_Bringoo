import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'markText' })
export class MarkTextPipe implements PipeTransform {
  transform(value: string, search: string | null): { prefix: string; marked: string; suffix: string } {
    let marked: string = '';
    let prefix: string = '';
    let suffix: string = '';

    if (search) {
      search = search.toLowerCase();
      const index: number = value.toLowerCase().indexOf(search);
      marked = value.slice(index, index + search.length) ?? '';
      if (marked) {
        prefix = value.slice(0, index);
        suffix = value.slice(index + search.length);
      } else {
        prefix = value;
      }
    } else {
      marked = value;
    }

    return {
      prefix,
      marked,
      suffix,
    };
  }
}

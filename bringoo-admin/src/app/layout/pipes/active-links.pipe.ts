import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeLinks',
})
export class ActiveLinksPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, ...args: any[]): any {
    return null;
  }
}

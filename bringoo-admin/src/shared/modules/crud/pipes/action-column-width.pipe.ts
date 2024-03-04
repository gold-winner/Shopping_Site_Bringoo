import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionColumnWidth',
})
export class ActionColumnWidthPipe implements PipeTransform {
  transform(value: boolean[], widthForOneElement: number = 38, minWidth: number = 65): string {
    const width: number = value.reduce((acc: number, status: boolean) => Number(status) + acc, 0) * widthForOneElement;
    return `${width < minWidth ? minWidth : width}px`;
  }
}

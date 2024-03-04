import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'receiptUpdateGroupsPipe' })
export class ReceiptUpdateGroupsPipe implements PipeTransform {
  transform(urlsWithEventType: string[]): { add: string[]; delete: string[] } {
    const add: string[] = this.mapUrl(urlsWithEventType.filter((url: string) => url.includes('add')));
    const del: string[] = this.mapUrl(urlsWithEventType.filter((url: string) => url.includes('delete')));

    return {
      add,
      delete: del,
    };
  }

  mapUrl(typeAndUrls: string[]): string[] {
    return typeAndUrls.map((typeAndUrl: string) => typeAndUrl.split(' ')[1]);
  }
}

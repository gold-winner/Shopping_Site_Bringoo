import { Pipe, PipeTransform } from '@angular/core';

import { ImageMiniature } from '../helpers/image.miniature';

@Pipe({ name: 'imageMiniature' })
export class ImageMiniaturePipe implements PipeTransform {
  transform(originalUrl?: string, minImageSize: number = 50): string {
    return originalUrl ? ImageMiniature(originalUrl, minImageSize) : '';
  }
}

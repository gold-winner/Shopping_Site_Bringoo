import { Pipe, PipeTransform } from '@angular/core';

import { KeyPointCreateInput } from '../../../../../shared/api/auth/data-contracts';
import { DropCreateRouteType } from '../type/drop-create-route.type';

@Pipe({ name: 'keyPointInput' })
export class KeyPointInputPipe implements PipeTransform {
  transform(value: DropCreateRouteType): KeyPointCreateInput | null {
    if ('orderStatus' in value) {
      return null;
    }
    return value;
  }
}

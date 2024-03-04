import { Pipe, PipeTransform } from '@angular/core';

import { KeyPointTypeEnum } from '../../../../../shared/api/auth/data-contracts';

@Pipe({ name: 'keyPointTypeIcon' })
export class KeyPointTypeIconPipe implements PipeTransform {
  transform(value: KeyPointTypeEnum): 'pause' | 'car' | 'to-top' | 'sync' {
    switch (value) {
      case KeyPointTypeEnum.BREAK_POINT: {
        return 'pause';
      }
      case KeyPointTypeEnum.DROP_OFF: {
        return 'car';
      }
      case KeyPointTypeEnum.PICK_UP: {
        return 'to-top';
      }
      case KeyPointTypeEnum.MOBILITY_REFUEL: {
        return 'sync';
      }
    }
  }
}

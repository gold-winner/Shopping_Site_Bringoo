import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CrudStoreService } from '../api/auth/crud-store.service';
import { StoreEntity } from '../api/auth/data-contracts';

@Pipe({ name: 'storeName' })
export class StoreNamePipe implements PipeTransform {
  constructor(private readonly service: CrudStoreService) {}

  transform(id: string): Observable<string> {
    return this.service.findOne(id).pipe(map(({ name_i18n }: StoreEntity) => name_i18n ?? ''));
  }
}

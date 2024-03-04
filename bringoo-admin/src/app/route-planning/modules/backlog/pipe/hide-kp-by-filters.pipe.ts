import { Pipe, PipeTransform } from '@angular/core';

import { KeyPointDto, LogisticStoreDto } from '../../../../../shared/api/auth/data-contracts';
import { BacklogSearchType } from '../type/backlog-search.type';

@Pipe({ name: 'hideKpByFilters' })
export class HideKpByFiltersPipe implements PipeTransform {
  // eslint-disable-next-line complexity
  private hasSearchMatch(kp: KeyPointDto, search: string | null): boolean {
    if (!search) return false;

    search = search.toLowerCase();

    const valuesForMatch: string[] = [
      (kp.store?.name_i18n || kp.order?.store?.name_i18n || '').toLowerCase(),
      kp.driver ? `${kp.driver?.firstName} ${kp.driver?.lastName}`.toLowerCase() : '',
      kp.picker ? `${kp.picker?.firstName} ${kp.picker?.lastName}`.toLowerCase() : '',
      `${kp.order?.customerName}`.toLowerCase(),
      `${kp.order?.orderNumber}`.toLowerCase(),
    ].filter(Boolean);

    for (const values of valuesForMatch) {
      if (values.includes(search)) return true;
    }

    return false;
  }

  hasStaff(item: KeyPointDto, staffIds: string[]): boolean {
    return !item.driver && !item.picker ? false : staffIds.includes(item.driver?.id || '') || staffIds.includes(item.picker?.id || '');
  }

  hasStore(item: KeyPointDto, storeIds: string[]): boolean {
    const store: LogisticStoreDto | undefined = item.store ?? item.order?.store;
    return store ? storeIds.includes(store.id) : false;
  }

  // eslint-disable-next-line complexity
  transform(item: KeyPointDto, { staffIds, storeIds, search }: BacklogSearchType): boolean {
    if ((!staffIds || staffIds.length === 0) && (!storeIds || storeIds.length === 0) && !search) {
      return false;
    }

    const hasSearchMatch: boolean = this.hasSearchMatch(item, search);
    const hasStaffMatch: boolean = this.hasStaff(item, staffIds);
    const hasStoreMatch: boolean = this.hasStore(item, storeIds);

    return !(hasSearchMatch || hasStaffMatch || hasStoreMatch);
  }
}

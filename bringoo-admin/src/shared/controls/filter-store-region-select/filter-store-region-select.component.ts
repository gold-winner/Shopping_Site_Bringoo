import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudStoreRegionService } from '../../api/auth/crud-store-region.service';
import { StoreRegionEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';
import { FilterSearch } from '../../types/crud-filters.types';

@Component({
  selector: 'app-filter-store-region-select',
  templateUrl: 'filter-store-region-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterStoreRegionSelectComponent),
      multi: true,
    },
  ],
})
export class FilterStoreRegionSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Store region';
  @Input() label: string = 'Store region filter';

  storeRegionSelect: SelectOptions<StoreRegionEntity> = {
    service: this.crudStoreRegionService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: StoreRegionEntity): string {
      return item.name_i18n || '---';
    },
    searchForS(term: string): FilterSearch<StoreRegionEntity>[] {
      return [
        {
          $or: [
            {
              name_i18n: { [CondOperator.CONTAINS_LOW]: term },
            },
            {
              code: { [CondOperator.CONTAINS_LOW]: term },
            },
          ],
        },
      ];
    },
  };

  constructor(private crudStoreRegionService: CrudStoreRegionService, protected readonly inj: Injector) {
    super(inj);
  }
}

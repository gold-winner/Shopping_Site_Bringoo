import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudStoreService } from '../../api/auth/crud-store.service';
import { StoreEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-filter-store-select',
  templateUrl: 'filter-store-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterStoreSelectComponent),
      multi: true,
    },
  ],
})
export class FilterStoreSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Store';
  @Input() label: string = 'Store';
  @Input() onlyActive: boolean = false;
  @Input() required: boolean = false;

  storeSelect: SelectOptions<StoreEntity> = {
    service: this.crudStoreService,
    fields: ['name_i18n', 'id'],
    sort: ['name_i18n,ASC'],
    valueKey: 'id',
    getLabel(item: StoreEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudStoreService: CrudStoreService, protected readonly inj: Injector) {
    super(inj);
  }

  ngOnInit(): void {
    this.setFilter();
    super.ngOnInit();
  }

  setFilter(): void {
    if (this.onlyActive) {
      this.storeSelect = {
        ...this.storeSelect,
        filter: [['isActive', CondOperator.EQUALS, 'true'].join('||')],
      };
    }
  }
}

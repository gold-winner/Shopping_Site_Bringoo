import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudStoreBrandService } from '../../api/auth/crud-store-brand.service';
import { StoreBrandEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-filter-store-brand-select',
  templateUrl: 'filter-store-brand-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterStoreBrandSelectComponent),
      multi: true,
    },
  ],
})
export class FilterStoreBrandSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Store brand';
  @Input() label: string = 'Store brand filter';

  storeSelect: SelectOptions<StoreBrandEntity> = {
    service: this.crudStoreBrandService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: StoreBrandEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudStoreBrandService: CrudStoreBrandService, protected readonly inj: Injector) {
    super(inj);
  }
}

import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudCorporateService } from '../../api/auth/crud-corporate.service';
import { ProductBrandEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-filter-corporate-select',
  templateUrl: 'filter-corporate-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterCorporateSelectComponent),
      multi: true,
    },
  ],
})
export class FilterCorporateSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Corporate';
  @Input() label: string = 'Corporate filter';

  storeSelect: SelectOptions<ProductBrandEntity> = {
    service: this.crudCorporateService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductBrandEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudCorporateService: CrudCorporateService, protected readonly inj: Injector) {
    super(inj);
  }
}

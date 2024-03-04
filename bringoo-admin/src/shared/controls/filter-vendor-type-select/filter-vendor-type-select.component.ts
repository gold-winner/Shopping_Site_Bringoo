import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudVendorTypeService } from '../../api/auth/crud-vendor-type.service';
import { VendorTypeEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-filter-vendor-type-select',
  templateUrl: 'filter-vendor-type-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterVendorTypeSelectComponent),
      multi: true,
    },
  ],
})
export class FilterVendorTypeSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Vendor type';
  @Input() label: string = 'Vendor type filter';

  storeSelect: SelectOptions<VendorTypeEntity> = {
    service: this.crudVendorTypeService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: VendorTypeEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudVendorTypeService: CrudVendorTypeService, protected readonly inj: Injector) {
    super(inj);
  }
}

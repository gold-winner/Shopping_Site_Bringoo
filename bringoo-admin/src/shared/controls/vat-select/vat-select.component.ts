import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudVatService } from '../../api/auth/crud-vat.service';
import { VatEntity, VendorTypeEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-vat-select',
  templateUrl: 'vat-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VatSelectComponent),
      multi: true,
    },
  ],
})
export class VatSelectComponent extends CustomControlComponent<string> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Vat';
  @Input() label: string = 'Vat';
  @Input() required: boolean = false;

  vatSelect: SelectOptions<VatEntity> = {
    service: this.service,
    fields: ['name_i18n', 'code'],
    filter: [['isActive', CondOperator.EQUALS, true].join('||')],
    valueKey: 'code',
    getLabel(item: VendorTypeEntity): string {
      return item.name_i18n || item.code || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private service: CrudVatService, protected readonly inj: Injector) {
    super(inj);
  }
}

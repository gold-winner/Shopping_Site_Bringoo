import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudLoyaltyProgramService } from '../../api/auth/crud-loyalty-program.service';
import { LoyaltyProgramEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-loyalty-program-select',
  templateUrl: 'loyalty-program-select.component.html',
  host: { class: 'd-block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoyaltyProgramSelectComponent),
      multi: true,
    },
  ],
})
export class LoyaltyProgramSelectComponent extends CustomControlComponent<string> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Loyalty Program';
  @Input() label: string = 'Loyalty Program';
  @Input() required: boolean = false;

  loyaltyProgramSelect: SelectOptions<LoyaltyProgramEntity> = {
    service: this.service,
    fields: ['name_i18n', 'code', 'id'],
    valueKey: 'id',
    getLabel(item: LoyaltyProgramEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private readonly service: CrudLoyaltyProgramService, protected readonly inj: Injector) {
    super(inj);
  }
}

import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudNationalityService } from '../../api/auth/crud-nationality.service';
import { NationalityEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-nationality-select',
  templateUrl: 'nationality-select.component.html',
  host: { class: 'd-block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NationalitySelectComponent),
      multi: true,
    },
  ],
})
export class NationalitySelectComponent extends CustomControlComponent<string> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Nationality';
  @Input() label: string = 'Nationality';
  @Input() required: boolean = false;

  vatSelect: SelectOptions<NationalityEntity> = {
    service: this.service,
    fields: ['nounNationality_i18n', 'code'],
    filter: [['isActive', CondOperator.EQUALS, true].join('||')],
    valueKey: 'code',
    getLabel(item: NationalityEntity): string {
      return item.nounNationality_i18n || item.code || '---';
    },
    search(term: string): string[] {
      return [
        ['nounNationality_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private service: CrudNationalityService, protected readonly inj: Injector) {
    super(inj);
  }
}

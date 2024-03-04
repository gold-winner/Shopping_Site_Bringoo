import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudCountryService } from '../../api/auth/crud-country.service';
import { CountryEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-filter-country-select',
  templateUrl: 'filter-country-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterCountrySelectComponent),
      multi: true,
    },
  ],
})
export class FilterCountrySelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Country filter';
  @Input() label: string = 'Country filter';
  @Input() isRequired: boolean = false;

  countrySelect: SelectOptions<CountryEntity> = {
    service: this.crudCountryService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: CountryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudCountryService: CrudCountryService, protected readonly inj: Injector) {
    super(inj);
  }
}

import { Component, forwardRef, Injector, Input } from '@angular/core';
import { FormControl, FormControlName, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { CrudLanguageService } from '../../api/auth/crud-language.service';
import { VendorTypeEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-language-select',
  templateUrl: 'language-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageSelectComponent),
      multi: true,
    },
  ],
})
export class LanguageSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Language';
  @Input() label: string = 'Language';
  @Input() required: boolean = false;

  languageSelect: SelectOptions<VendorTypeEntity> = {
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

  ngAfterViewInit(): void {
    const parentControl: NgControl = this.inj.get(NgControl, new FormControl());
    if (parentControl instanceof FormControlName && parentControl.control?.validator) {
      this.control.validator = parentControl.control.validator;

      parentControl.control.markAsTouched = (): void => {
        this.control.markAsTouched({ onlySelf: true });
        this.control.updateValueAndValidity();
      };
    }
    this.serverValidation(parentControl);
  }

  constructor(private service: CrudLanguageService, protected readonly inj: Injector) {
    super(inj);
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CrudLanguageService } from '../../../../../../shared/api/auth/crud-language.service';
import { LangCodeEnum, LanguageEntity, ManagerCreateInput, SalutationEnum } from '../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../shared/config/country-hpone-codes.config';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';

@Component({
  selector: 'app-manager-create-form',
  templateUrl: './managers-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersCreateFormComponent extends DynamicForm<ManagerCreateInput> implements OnInit {
  salutationList: string[] = Object.keys(SalutationEnum);
  passwordVisible: boolean = false;
  passwordMaxLength: number = 100;

  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;

  constructor(private fb: UntypedFormBuilder, private crudLanguageService: CrudLanguageService) {
    super();
  }

  languageCode: SelectOptions<LanguageEntity> = {
    service: this.crudLanguageService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: LanguageEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  defaultFormValue: Partial<ManagerCreateInput> = {
    settings: {
      managerLanguageCode: LangCodeEnum.DE,
      firstName: '',
      lastName: '',
    },
  };

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      role: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(this.passwordMaxLength)]],
      settings: this.fb.group({
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        dateOfBirth: [null],
        placeOfBirth: [null],
        managerLanguageCode: [null, [Validators.required]],
        nationalityCode: [null],
        salutation: [null],
        phoneCountryCode: [null],
        phoneNumber: [null],
      }),
    });
  }
}

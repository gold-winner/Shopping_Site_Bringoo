import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CrudCountryService } from '../../../../../../../../shared/api/auth/crud-country.service';
import {
  CountryEntity,
  StoreContactCreateInput,
  StoreContactTypeEnum,
  StoreContactUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../../../shared/config/country-hpone-codes.config';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';

@Component({
  selector: 'app-language-update-form',
  templateUrl: './store-contacts-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreContactsUpdateFormComponent extends DynamicForm<StoreContactUpdateInput> {
  contactTypeList: string[] = Object.keys(StoreContactTypeEnum);
  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;

  defaultFormValue: Partial<StoreContactCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
  };

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crudCountryService: CrudCountryService,
  ) {
    super();
    this.buildForm();
  }

  countryCodeSelect: SelectOptions<CountryEntity> = {
    service: this.crudCountryService,
    fields: ['name_i18n', 'code'],
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

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      contactType: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneCountryCode: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      streetName: [null],
      streetNumber: [null],
      countryCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      description: [null, []],
    });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CrudCountryService } from '../../../../../../../../../shared/api/auth/crud-country.service';
import { AddressTypeEnum, CountryEntity, CustomerAddressUpdateInput } from '../../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../../shared/modules/crud/enums/cond-operator';
import { CustomerIdService } from '../../services/customer-id-service';

@Component({
  selector: 'app-select-customer-address-update-form',
  templateUrl: './select-customer-address-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomerAddressUpdateFormComponent extends DynamicForm<CustomerAddressUpdateInput> {
  addressTypeList: string[] = Object.keys(AddressTypeEnum);

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

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private customerIdService: CustomerIdService,
    private readonly crudCountryService: CrudCountryService,
  ) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      addressName: [null, [Validators.required]],
      addressType: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      streetName: [null, [Validators.required]],
      streetNumber: [null, [Validators.required]],
      floorNumber: [null, []],
      apartmentNumber: [null, []],
      state: [null, []],
      location: this.fb.group({
        lat: [null, [Validators.required]],
        lng: [null, [Validators.required]],
      }),
      isDefault: [null, [Validators.required]],
    });
  }
}

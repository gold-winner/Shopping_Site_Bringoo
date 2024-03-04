import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudSettingsCountryAllowedService } from '../../../../../../../../shared/api/auth/crud-settings-country-allowed.service';
import {
  SettingsCountryAllowedCreateInput,
  SettingsCountryAllowedEntity,
  SettingsCountryAllowedUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CountryAllowedCreateFormComponent } from '../country-allowed-create-form/country-allowed-create-form.component';
import { CountryAllowedFilterFormComponent } from '../country-allowed-filter-form/country-allowed-filter-form.component';
import { CountryAllowedUpdateFormComponent } from '../country-allowed-update-form/country-allowed-update-form.component';

@Component({
  selector: 'app-country-allowed-crud',
  templateUrl: './country-allowed-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAllowedCrudComponent {
  createForm: Type<DynamicForm<SettingsCountryAllowedCreateInput>> = CountryAllowedCreateFormComponent;
  updateForm: Type<DynamicForm<SettingsCountryAllowedUpdateInput>> = CountryAllowedUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = CountryAllowedFilterFormComponent;
  fields: CrudFields<SettingsCountryAllowedEntity> = ['isActive', 'phoneCountryCode'];

  config: CrudConfig = {
    title: 'Sms countries allowed',
    plural: 'Sms countries allowed',
    single: 'Sms country allowed',
  };

  columns: CrudColumn<SettingsCountryAllowedEntity>[] = [
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: SettingsCountryAllowedEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Not active',
      },
    },
    {
      label: 'Phone Country Code',
      isSortable: true,
      sortBy: 'phoneCountryCode',
      getField(item: SettingsCountryAllowedEntity): EntityValue {
        return item.phoneCountryCode;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudSettingsCountryAllowedService) {}
}

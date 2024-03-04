import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCountryService } from '../../../../../../../../shared/api/auth/crud-country.service';
import { CountryCreateInput, CountryEntity, CountryUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CountryCreateFormComponent } from '../country-create-form/country-create-form.component';
import { CountryFilterFormComponent } from '../country-filter-form/country-filter-form.component';
import { CountryUpdateFormComponent } from '../country-update-form/country-update-form.component';

@Component({
  selector: 'app-country-crud',
  templateUrl: './country-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryCrudComponent {
  createForm: Type<DynamicForm<CountryCreateInput>> = CountryCreateFormComponent;
  updateForm: Type<DynamicForm<CountryUpdateInput>> = CountryUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = CountryFilterFormComponent;

  fields: CrudFields<CountryEntity> = ['code', 'iso2', 'iso3', 'name_i18n', 'isActive'];

  config: CrudConfig = {
    title: 'Country',
    plural: 'Countries',
    single: 'Country',
  };

  columns: CrudColumn<CountryEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: CountryEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'ISO2',
      isSortable: true,
      sortBy: 'iso2',
      getField(item: CountryEntity): EntityValue {
        return item.iso2;
      },
      type: 'text',
    },
    {
      label: 'ISO3',
      isSortable: true,
      sortBy: 'iso3',
      getField(item: CountryEntity): EntityValue {
        return item.iso3;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: CountryEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: CountryEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudCountryService) {}
}

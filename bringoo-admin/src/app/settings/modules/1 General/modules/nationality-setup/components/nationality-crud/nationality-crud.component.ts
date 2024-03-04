import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudNationalityService } from '../../../../../../../../shared/api/auth/crud-nationality.service';
import { NationalityCreateInput, NationalityEntity, NationalityUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { NationalityCreateComponent } from '../nationality-create/nationality-create.component';
import { NationalityFilterComponent } from '../nationality-filter/nationality-filter.component';
import { NationalityUpdateComponent } from '../nationality-update/nationality-update.component';

@Component({
  selector: 'app-nationality-crud',
  templateUrl: './nationality-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NationalityCrudComponent {
  createForm: Type<DynamicForm<NationalityCreateInput>> = NationalityCreateComponent;
  updateForm: Type<DynamicForm<NationalityUpdateInput>> = NationalityUpdateComponent;
  filterForm: Type<DynamicFilterFormComponent> = NationalityFilterComponent;

  fields: CrudFields<NationalityEntity> = ['code', 'adjectiveNationality_i18n', 'nounNationality_i18n', 'isActive'];
  join: string[] = ['country||name_i18n'];

  config: CrudConfig = {
    title: 'Nationality',
    plural: 'Nationalities',
    single: 'Nationality',
  };

  columns: CrudColumn<NationalityEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: NationalityEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Adjective',
      isSortable: true,
      sortBy: 'adjectiveNationality_i18n',
      getField(item: NationalityEntity): EntityValue {
        return item.adjectiveNationality_i18n;
      },
      type: 'text',
    },
    {
      label: 'Noun',
      isSortable: true,
      sortBy: 'nounNationality_i18n',
      getField(item: NationalityEntity): EntityValue {
        return item.nounNationality_i18n;
      },
      type: 'text',
    },
    {
      label: 'Country',
      isSortable: true,
      sortBy: 'country.name_i18n',
      getField(item: NationalityEntity): EntityValue {
        return item.country?.name_i18n ?? '---';
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: NationalityEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudNationalityService) {}
}

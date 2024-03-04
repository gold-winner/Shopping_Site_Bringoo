import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudReplaceTypeService } from '../../../../../../../../shared/api/auth/crud-replace-type.service';
import { ReplaceTypeCreateInput, ReplaceTypeEntity, ReplaceTypeUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ReplacementOptionCreateFormComponent } from '../cancel-reason-create-form/replacement-option-create-form.component';
import { ReplacementOptionFilterFormComponent } from '../replacement-option-filter-form/replacement-option-filter-form.component';
import { ReplacementOptionUpdateFormComponent } from '../replacement-option-update-form/replacement-option-update-form.component';

@Component({
  selector: 'app-replacement-option-crud',
  templateUrl: './replacement-option-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplacementOptionCrudComponent {
  createForm: Type<DynamicForm<ReplaceTypeCreateInput>> = ReplacementOptionCreateFormComponent;
  updateForm: Type<DynamicForm<ReplaceTypeUpdateInput>> = ReplacementOptionUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ReplacementOptionFilterFormComponent;

  pageSizeOptions: number[] = [50, 100, 250, 500];

  fields: CrudFields<ReplaceTypeEntity> = ['code', 'name_i18n', 'isActive', 'create_date', 'update_date'];
  config: CrudConfig = {
    title: 'Replacement Options',
    plural: 'Replacement Options',
    single: 'Replacement Options',
  };

  columns: CrudColumn<ReplaceTypeEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: ReplaceTypeEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ReplaceTypeEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Description',
      isSortable: true,
      sortBy: 'description_i18n',
      getField(item: ReplaceTypeEntity): EntityValue {
        return item.description_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ReplaceTypeEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Created',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ReplaceTypeEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudReplaceTypeService) {}
}

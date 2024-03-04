import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudDepositTypeService } from '../../../../../../../../shared/api/auth/crud-deposit-type.service';
import { DepositTypeCreateInput, DepositTypeEntity, DepositTypeUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { DepositTypeSetupCreateFormComponent } from '../deposit-type-setup-create-form/deposit-type-setup-create-form.component';
import { DepositTypeSetupFilterFormComponent } from '../deposit-type-setup-filter-form/deposit-type-setup-filter-form.component';
import { DepositTypeSetupUpdateFormComponent } from '../deposit-type-setup-update-form/deposit-type-setup-update-form.component';

@Component({
  selector: 'app-deposit-type-setup-crud',
  templateUrl: './deposit-type-setup-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositTypeSetupCrudComponent {
  createForm: Type<DynamicForm<DepositTypeCreateInput>> = DepositTypeSetupCreateFormComponent;
  updateForm: Type<DynamicForm<DepositTypeUpdateInput>> = DepositTypeSetupUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = DepositTypeSetupFilterFormComponent;

  fields: CrudFields<DepositTypeEntity> = ['code', 'name_i18n', 'isActive'];

  config: CrudConfig = {
    title: 'Deposit Type',
    plural: 'Deposit Types',
    single: 'Deposit Type',
  };

  columns: CrudColumn<DepositTypeEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: DepositTypeEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: DepositTypeEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: DepositTypeEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudDepositTypeService) {}
}

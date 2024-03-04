import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { Params } from '@angular/router';

import { CrudManagerRoleService } from '../../../../../../../../shared/api/auth/crud-manager-role.service';
import { ManagerRoleCreateInput, ManagerRoleEntity, ManagerRoleUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ManagerRolesCreateFormComponent } from '../manager-roles-create-form/manager-roles-create-form.component';
import { ManagerRolesFilterFormComponent } from '../manager-roles-filter-form/manager-roles-filter-form.component';
import { ManagerRolesUpdateFormComponent } from '../manager-roles-update-form/manager-roles-update-form.component';

@Component({
  selector: 'app-manager-roles-crud',
  templateUrl: './manager-roles-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerRolesCrudComponent {
  createForm: Type<DynamicForm<ManagerRoleCreateInput>> = ManagerRolesCreateFormComponent;
  updateForm: Type<DynamicForm<ManagerRoleUpdateInput>> = ManagerRolesUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ManagerRolesFilterFormComponent;

  fields: CrudFields<ManagerRoleEntity> = ['code', 'description', 'isActive', 'create_date'];

  config: CrudConfig = {
    title: 'Manager Roles',
    plural: 'Manager Roles',
    single: 'Manager Role',
    formWidth: 600,
    isActionColumnVisible: true,
  };

  columns: CrudColumn<ManagerRoleEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: ManagerRoleEntity): EntityValue {
        return item.code;
      },
      type: 'link',
      link(): string {
        return './';
      },
      getQueryParams(item: ManagerRoleEntity): Params {
        return { roleCode: item.code };
      },
    },
    {
      label: 'Description',
      isSortable: true,
      sortBy: 'description',
      getField(item: ManagerRoleEntity): EntityValue {
        return item.description;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'description_i18n',
      getField(item: ManagerRoleEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        falseText: 'Inactive',
        trueText: 'Active',
      },
    },
    {
      label: 'Created',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: ManagerRoleEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudManagerRoleService) {}
}

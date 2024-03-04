import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudManagerService } from '../../../../../../shared/api/auth/crud-manager.service';
import { ManagerCreateInput, ManagerEntity, ManagerUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { ManagersCreateFormComponent } from '../managers-create-form/managers-create-form.component';
import { ManagersFilterFormComponent } from '../managers-filter-form/managers-filter-form.component';
import { ManagersUpdateFormComponent } from '../managers-update-form/managers-update-form.component';

@Component({
  selector: 'app-manager-crud',
  templateUrl: './managers-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersCrudComponent {
  createForm: Type<DynamicForm<ManagerCreateInput>> = ManagersCreateFormComponent;
  updateForm: Type<DynamicForm<ManagerUpdateInput>> = ManagersUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ManagersFilterFormComponent;

  fields: CrudFields<ManagerEntity> = ['email', 'role', 'isEmailVerified', 'isActive'];
  join: string[] = ['settings||firstName,lastName'];
  config: CrudConfig = {
    title: 'Managers',
    plural: 'Managers',
    single: 'Manager',
  };

  columns: CrudColumn<ManagerEntity>[] = [
    {
      label: 'Name',
      isSortable: false,
      getField(item: ManagerEntity): EntityValue {
        return [item.settings?.firstName, item.settings?.lastName].filter(Boolean).join(' ');
      },
      type: 'link',
      link(item: ManagerEntity): any {
        return `details/${item.id}`;
      },
      fixedLeft: true,
    },
    {
      label: 'Email',
      isSortable: true,
      sortBy: 'email',
      getField(item: ManagerEntity): EntityValue {
        return item.email;
      },
      type: 'text',
    },
    {
      label: 'Account Role',
      isSortable: true,
      sortBy: 'role',
      getField(item: ManagerEntity): EntityValue {
        return item.role;
      },
      type: 'text',
    },
    {
      label: 'Verified email',
      isSortable: true,
      sortBy: 'isEmailVerified',
      getField(item: ManagerEntity): EntityValue {
        return item.isEmailVerified;
      },
      type: 'boolean',
      boolean: {
        falseText: 'Not Verified',
        trueText: 'Verified',
      },
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ManagerEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudManagerService) {}
}

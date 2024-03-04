import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStaffService } from '../../../../../../shared/api/auth/crud-staff.service';
import { StaffCreateInput, StaffEntity, StaffUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { CreateFormComponent } from '../create-form/create-form.component';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { UpdateFormComponent } from '../update-form/update-form.component';

@Component({
  selector: 'app-crud-staff',
  templateUrl: './crud-staff.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudStaffComponent {
  createForm: Type<DynamicForm<StaffCreateInput>> = CreateFormComponent;
  updateForm: Type<DynamicForm<StaffUpdateInput>> = UpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = FilterFormComponent;

  fields: CrudFields<StaffEntity> = ['email', 'isActive', 'isEmailVerified', 'create_date', 'update_date', 'role', 'isOnline'];
  join: string[] = ['settings||firstName,lastName,staffNumber,photoUrl'];
  config: CrudConfig = {
    title: 'Staff',
    plural: 'Staffs',
    single: 'Staff',
  };

  columns: CrudColumn<StaffEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: StaffEntity): EntityValue {
        return item.settings?.photoUrl;
      },
      type: 'image',
      fixedLeft: true,
    },
    {
      label: 'Staff Code',
      isSortable: false,
      getField(item: StaffEntity): EntityValue {
        return item.settings?.staffNumber;
      },
      type: 'link',
      link(item: StaffEntity): any {
        return `details/${item.id}`;
      },
      fixedLeft: true,
    },
    {
      label: 'Name',
      isSortable: false,
      getField(item: StaffEntity): EntityValue {
        return [item.settings?.firstName, item.settings?.lastName].filter(Boolean).join(' ');
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Email',
      isSortable: true,
      sortBy: 'email',
      getField(item: StaffEntity): EntityValue {
        return item.email;
      },
      type: 'text',
    },
    {
      label: 'Account Role',
      isSortable: true,
      sortBy: 'role',
      getField(item: StaffEntity): EntityValue {
        return item.role;
      },
      type: 'text',
    },
    {
      label: 'Is Online',
      isSortable: true,
      sortBy: 'isOnline',
      getField(item: StaffEntity): EntityValue {
        return item.isOnline;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Yes',
        falseText: 'No',
      },
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: StaffEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Verified Email',
      isSortable: true,
      sortBy: 'isEmailVerified',
      getField(item: StaffEntity): EntityValue {
        return item.isEmailVerified;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Yes',
        falseText: 'No',
      },
    },
    {
      label: 'Date Created',
      isSortable: true,
      sortBy: 'isEmailVerified',
      getField(item: StaffEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Date Updated',
      isSortable: true,
      sortBy: 'isEmailVerified',
      getField(item: StaffEntity): EntityValue {
        return item.update_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Employee Type',
      isSortable: true,
      sortBy: 'isExternalEmployee',
      getField(item: StaffEntity): EntityValue {
        return item.isExternalEmployee;
      },
      type: 'boolean',
      boolean: {
        trueText: 'External Employee',
        falseText: 'Inhouse Employee',
      },
    },
  ];

  constructor(public readonly service: CrudStaffService) {}
}

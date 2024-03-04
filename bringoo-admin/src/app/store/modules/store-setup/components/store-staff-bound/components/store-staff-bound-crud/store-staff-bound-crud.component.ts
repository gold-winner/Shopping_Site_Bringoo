import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudStoreStaffBoundService } from '../../../../../../../../shared/api/auth/crud-store-staff-bound.service';
import { StoreStaffBoundEntity, StoreStaffManyCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreStaffBoundCreateFormComponent } from '../store-staff-bound-create-form/store-staff-bound-create-form.component';
import { StoreStaffBoundFilterComponent } from '../store-staff-bound-filter/store-staff-bound-filter.component';

@Component({
  selector: 'app-store-staff-bound-crud',
  templateUrl: './store-staff-bound-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreStaffBoundCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = StoreStaffBoundFilterComponent;
  createForm: Type<DynamicForm<StoreStaffManyCreateInput>> = StoreStaffBoundCreateFormComponent;

  fields: CrudFields<StoreStaffBoundEntity> = ['isActive'];
  join: string[] = ['staff||id,role', 'staff.settings||firstName,lastName'];
  openPanel: boolean = false;

  config: CrudConfig = {
    title: 'Staff store bounds',
    plural: 'Staff store bounds',
    single: 'Staff store bound',
    isEditButtonVisible: false,
    formWidth: 800,
    onCreate: (input: StoreStaffManyCreateInput): Observable<StoreStaffBoundEntity[]> => {
      return this.service.createManyForStore(input);
    },
  };

  columns: CrudColumn<StoreStaffBoundEntity>[] = [
    {
      label: 'Staff Name',
      isSortable: true,
      sortBy: 'staff.settings.firstName, staff.settings.lastName',
      getField(item: StoreStaffBoundEntity): EntityValue {
        return `${item.staff?.settings?.firstName} ${item.staff?.settings?.lastName}`;
      },
      type: 'link',
      link(item: StoreStaffBoundEntity): string {
        return `/users/staff/details/${item.staff?.id}`;
      },
    },
    {
      label: 'Role',
      isSortable: true,
      sortBy: 'staff.settings.firstName, staff.settings.lastName',
      getField(item: StoreStaffBoundEntity): EntityValue {
        return `${item.staff?.role}`;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: StoreStaffBoundEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudStoreStaffBoundService, public readonly storeDetailsService: StoreDetailsService) {}
}

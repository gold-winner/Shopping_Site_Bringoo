import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreStaffBoundService } from '../../../../../../../../shared/api/auth/crud-store-staff-bound.service';
import { StoreStaffBoundEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StaffStoreBoundFilterComponent } from '../staff-store-bound-filter/staff-store-bound-filter.component';

@Component({
  selector: 'app-staff-store-bound-crud',
  templateUrl: './staff-store-bound-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffStoreBoundCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = StaffStoreBoundFilterComponent;
  reloadData: symbol | undefined;
  submitSymbol: symbol | undefined;
  fields: CrudFields<StoreStaffBoundEntity> = ['isActive', 'storeId'];
  join: string[] = ['store||name_i18n'];
  openPanel: boolean = false;

  config: CrudConfig = {
    title: 'Store jobs entitlement',
    plural: 'Store jobs entitlement',
    single: 'Store jobs entitlement',
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    useTableHeightCalculation: false,
    formWidth: 800,
    actionsList: [
      {
        label: 'Create entitlement',
        action: (): void => {
          this.openPanel = true;
        },
      },
    ],
  };

  columns: CrudColumn<StoreStaffBoundEntity>[] = [
    {
      label: 'Store Name',
      isSortable: true,
      sortBy: 'store.name_i18n',
      getField(item: StoreStaffBoundEntity): EntityValue {
        return item.store?.name_i18n;
      },
      type: 'link',
      link(item: StoreStaffBoundEntity): string {
        return `/store/stores/${item.storeId}/store-staff-bound`;
      },
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

  onSubmit(): void {
    this.submitSymbol = Symbol('x');
    this.onCloseDrawer();
  }

  updateCrudData(): void {
    this.reloadData = Symbol('i');
  }

  onCloseDrawer(): void {
    this.openPanel = false;
  }

  constructor(public readonly service: CrudStoreStaffBoundService) {}
}

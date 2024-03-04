import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreRegionService } from '../../../../../../../../shared/api/auth/crud-store-region.service';
import { StoreRegionCreateInput, StoreRegionEntity, StoreRegionUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { StoreRegionCreateFormComponent } from '../store-region-create-form/store-region-create-form.component';
import { StoreRegionUpdateFormComponent } from '../store-region-update-form/store-region-update-form.component';

@Component({
  selector: 'app-store-region-type',
  templateUrl: './store-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreRegionComponent {
  createForm: Type<DynamicForm<StoreRegionCreateInput>> = StoreRegionCreateFormComponent;
  updateForm: Type<DynamicForm<StoreRegionUpdateInput>> = StoreRegionUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = FilterFormComponent;

  fields: CrudFields<StoreRegionEntity> = ['code', 'name_i18n', 'isActive', 'countryCode'];
  config: CrudConfig = {
    title: 'Store region',
    plural: 'Store regions',
    single: 'Store region',
  };

  columns: CrudColumn<StoreRegionEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: StoreRegionEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Country',
      isSortable: true,
      sortBy: 'countryCode',
      getField(item: StoreRegionEntity): EntityValue {
        return item.countryCode ?? '';
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: StoreRegionEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: StoreRegionEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudStoreRegionService) {}
}

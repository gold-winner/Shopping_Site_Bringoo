import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreWeightOptionService } from '../../../../../../../../shared/api/auth/crud-store-weight-option.service';
import {
  StoreWeightOptionCreateInput,
  StoreWeightOptionEntity,
  StoreWeightOptionUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreWeightOptionCreateFormComponent } from '../store-weight-option-create-form/store-weight-option-create-form.component';
import { StoreWeightOptionFilterFormComponent } from '../store-weight-option-filter-form/store-weight-option-filter-form.component';
import { StoreWeightOptionUpdateFormComponent } from '../store-weight-option-update-form/store-weight-option-update-form.component';

@Component({
  selector: 'app-store-weight-option-crud',
  templateUrl: './store-weight-option-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreWeightOptionCrudComponent {
  createForm: Type<DynamicForm<StoreWeightOptionCreateInput>> = StoreWeightOptionCreateFormComponent;
  updateForm: Type<DynamicForm<StoreWeightOptionUpdateInput>> = StoreWeightOptionUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreWeightOptionFilterFormComponent;

  fields: CrudFields<StoreWeightOptionEntity> = ['dateStart', 'dateEnd', 'timeStart', 'timeEnd', 'weightValue'];

  config: CrudConfig = {
    title: 'Weight Options',
    plural: 'Weight Options',
    single: 'Weight Option',
  };

  columns: CrudColumn<StoreWeightOptionEntity>[] = [
    {
      label: 'Date From',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: StoreWeightOptionEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Date To',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: StoreWeightOptionEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Start',
      isSortable: true,
      sortBy: 'timeStart',
      getField(item: StoreWeightOptionEntity): EntityValue {
        return item.timeStart;
      },
      type: 'text',
    },
    {
      label: 'End',
      isSortable: true,
      sortBy: 'timeEnd',
      getField(item: StoreWeightOptionEntity): EntityValue {
        return item.timeEnd;
      },
      type: 'text',
    },
    {
      label: 'Cart Max Weight, kg',
      isSortable: true,
      sortBy: 'weightValue',
      getField(item: StoreWeightOptionEntity): EntityValue {
        return `${item?.weightValue}`;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreWeightOptionService, public readonly storeDetailsService: StoreDetailsService) {}
}

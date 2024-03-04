import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStorePickDurationService } from '../../../../../../../../shared/api/auth/crud-store-pick-duration.service';
import {
  StorePickDurationCreateInput,
  StorePickDurationEntity,
  StorePickDurationUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StorePickDurationCreateFormComponent } from '../store-pick-duration-create-form/store-pick-duration-create-form.component';
import { StorePickDurationFilterFormComponent } from '../store-pick-duration-filter-form/store-pick-duration-filter-form.component';
import { StorePickDurationUpdateFormComponent } from '../store-pick-duration-update-form/store-pick-duration-update-form.component';

@Component({
  selector: 'app-store-pick-duration-crud',
  templateUrl: './store-pick-duration-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorePickDurationCrudComponent {
  createForm: Type<DynamicForm<StorePickDurationCreateInput>> = StorePickDurationCreateFormComponent;
  updateForm: Type<DynamicForm<StorePickDurationUpdateInput>> = StorePickDurationUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StorePickDurationFilterFormComponent;

  fields: CrudFields<StorePickDurationEntity> = [
    'dateStart',
    'dateEnd',
    'daysOfWeek',
    'timeStart',
    'timeEnd',
    'pickDurationCapacity',
    'isUsePickDurationTimeRange',
    'pickDurationTimeStart',
    'pickDurationTimeEnd',
  ];

  config: CrudConfig = {
    title: 'Pick durations',
    plural: 'Pick durations',
    single: 'Pick duration',
  };

  columns: CrudColumn<StorePickDurationEntity>[] = [
    {
      label: 'Date From',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: StorePickDurationEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Date To',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: StorePickDurationEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Days of Week',
      isSortable: false,
      getField(item: StorePickDurationEntity): EntityValue {
        return item.daysOfWeek;
      },
      type: 'tags',
    },
    {
      label: 'Start',
      isSortable: true,
      sortBy: 'timeStart',
      getField(item: StorePickDurationEntity): EntityValue {
        return item.timeStart;
      },
      type: 'text',
    },
    {
      label: 'End',
      isSortable: true,
      sortBy: 'timeEnd',
      getField(item: StorePickDurationEntity): EntityValue {
        return item.timeEnd;
      },
      type: 'text',
    },
    {
      label: 'Pick Duration Capacity',
      isSortable: true,
      sortBy: 'pickDurationCapacity',
      getField(item: StorePickDurationEntity): EntityValue {
        return item.pickDurationCapacity;
      },
      type: 'text',
    },
    {
      label: 'Use Pick Duration Time',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: StorePickDurationEntity): EntityValue {
        return item.isUsePickDurationTimeRange;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Yes',
        falseText: 'No',
      },
    },
    {
      label: 'Pick Duration Time start',
      isSortable: true,
      sortBy: 'pickDurationTimeStart',
      getField(item: StorePickDurationEntity): EntityValue {
        return item.pickDurationTimeStart;
      },
      type: 'text',
    },
    {
      label: 'Pick Duration Time end',
      isSortable: true,
      sortBy: 'pickDurationTimeEnd',
      getField(item: StorePickDurationEntity): EntityValue {
        return item.pickDurationTimeEnd;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStorePickDurationService, public readonly storeDetailsService: StoreDetailsService) {}
}

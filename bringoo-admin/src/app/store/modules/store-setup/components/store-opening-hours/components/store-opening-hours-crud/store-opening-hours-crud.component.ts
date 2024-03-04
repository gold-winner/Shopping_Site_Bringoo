import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreOpeningHourService } from '../../../../../../../../shared/api/auth/crud-store-opening-hour.service';
import {
  StoreOpeningHourCreateInput,
  StoreOpeningHourEntity,
  StoreOpeningHourUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreOpeningHoursCreateFormComponent } from '../store-opening-hours-create-form/store-opening-hours-create-form.component';
import { StoreOpeningHoursFilterFormComponent } from '../store-opening-hours-filter-form/store-opening-hours-filter-form.component';
import { StoreOpeningHoursUpdateFormComponent } from '../store-opening-hours-update-form/store-opening-hours-update-form.component';

@Component({
  selector: 'app-store-opening-hours-crud',
  templateUrl: './store-opening-hours-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOpeningHoursCrudComponent {
  createForm: Type<DynamicForm<StoreOpeningHourCreateInput>> = StoreOpeningHoursCreateFormComponent;
  updateForm: Type<DynamicForm<StoreOpeningHourUpdateInput>> = StoreOpeningHoursUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreOpeningHoursFilterFormComponent;

  fields: CrudFields<StoreOpeningHourEntity> = ['dateStart', 'dateEnd', 'daysOfWeek', 'timeStart', 'timeEnd'];

  config: CrudConfig = {
    title: 'Opening hours',
    plural: 'Opening hours',
    single: 'Opening hour',
  };

  columns: CrudColumn<StoreOpeningHourEntity>[] = [
    {
      label: 'Date From',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: StoreOpeningHourEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Date To',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: StoreOpeningHourEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Days of Week',
      isSortable: false,
      getField(item: StoreOpeningHourEntity): EntityValue {
        return item.daysOfWeek;
      },
      type: 'tags',
    },
    {
      label: 'Start',
      isSortable: true,
      sortBy: 'timeStart',
      getField(item: StoreOpeningHourEntity): EntityValue {
        return item.timeStart;
      },
      type: 'text',
    },
    {
      label: 'End',
      isSortable: true,
      sortBy: 'timeEnd',
      getField(item: StoreOpeningHourEntity): EntityValue {
        return item.timeEnd;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreOpeningHourService, public readonly storeDetailsService: StoreDetailsService) {}
}

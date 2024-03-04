import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreDeliverySlotService } from '../../../../../../../../shared/api/auth/crud-store-delivery-slot.service';
import {
  StoreDeliverySlotCreateInput,
  StoreDeliverySlotEntity,
  StoreDeliverySlotUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreDeliverySlotCreateFormComponent } from '../store-delivery-slot-create-form/store-delivery-slot-create-form.component';
import { StoreDeliverySlotFilterFormComponent } from '../store-delivery-slot-filter-form/store-delivery-slot-filter-form.component';
import { StoreDeliverySlotUpdateFormComponent } from '../store-delivery-slot-update-form/store-delivery-slot-update-form.component';

@Component({
  selector: 'app-store-delivery-slot-crud',
  templateUrl: './store-delivery-slot-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDeliverySlotCrudComponent {
  createForm: Type<DynamicForm<StoreDeliverySlotCreateInput>> = StoreDeliverySlotCreateFormComponent;
  updateForm: Type<DynamicForm<StoreDeliverySlotUpdateInput>> = StoreDeliverySlotUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreDeliverySlotFilterFormComponent;

  fields: CrudFields<StoreDeliverySlotEntity> = [
    'dateStart',
    'dateEnd',
    'daysOfWeek',
    'timeStart',
    'timeEnd',
    'slotCapacity',
    'slotDuration',
  ];

  config: CrudConfig = {
    title: 'Delivery slots',
    plural: 'Delivery slots',
    single: 'Delivery slot',
  };

  columns: CrudColumn<StoreDeliverySlotEntity>[] = [
    {
      label: 'Date From',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: StoreDeliverySlotEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Date To',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: StoreDeliverySlotEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Days of Week',
      isSortable: false,
      getField(item: StoreDeliverySlotEntity): EntityValue {
        return item.daysOfWeek;
      },
      type: 'tags',
    },
    {
      label: 'Start',
      isSortable: true,
      sortBy: 'timeStart',
      getField(item: StoreDeliverySlotEntity): EntityValue {
        return item.timeStart;
      },
      type: 'text',
    },
    {
      label: 'End',
      isSortable: true,
      sortBy: 'timeEnd',
      getField(item: StoreDeliverySlotEntity): EntityValue {
        return item.timeEnd;
      },
      type: 'text',
    },
    {
      label: 'Duration',
      isSortable: true,
      sortBy: 'slotDuration',
      getField(item: StoreDeliverySlotEntity): EntityValue {
        return item.slotDuration;
      },
      type: 'text',
    },
    {
      label: 'Capacity',
      isSortable: true,
      sortBy: 'slotCapacity',
      getField(item: StoreDeliverySlotEntity): EntityValue {
        return item.slotCapacity;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreDeliverySlotService, public readonly storeDetailsService: StoreDetailsService) {}
}

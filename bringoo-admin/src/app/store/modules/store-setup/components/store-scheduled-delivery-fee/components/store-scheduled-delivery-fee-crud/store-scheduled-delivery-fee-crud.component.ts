import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreScheduledDeliveryFeeService } from '../../../../../../../../shared/api/auth/crud-store-scheduled-delivery-fee.service';
import {
  StoreScheduledDeliveryFeeCreateInput,
  StoreScheduledDeliveryFeeEntity,
  StoreScheduledDeliveryFeeUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreScheduledDeliveryFeeCreateFormComponent } from '../store-scheduled-delivery-fee-create-form/store-scheduled-delivery-fee-create-form.component';
import { StoreScheduledDeliveryFeeFilterFormComponent } from '../store-scheduled-delivery-fee-filter-form/store-scheduled-delivery-fee-filter-form.component';
import { StoreScheduledDeliveryFeeUpdateFormComponent } from '../store-scheduled-delivery-fee-update-form/store-scheduled-delivery-fee-update-form.component';

@Component({
  selector: 'app-store-delivery-fee-crud',
  templateUrl: './store-scheduled-delivery-fee-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreScheduledDeliveryFeeCrudComponent {
  createForm: Type<DynamicForm<StoreScheduledDeliveryFeeCreateInput>> = StoreScheduledDeliveryFeeCreateFormComponent;
  updateForm: Type<DynamicForm<StoreScheduledDeliveryFeeUpdateInput>> = StoreScheduledDeliveryFeeUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreScheduledDeliveryFeeFilterFormComponent;

  fields: CrudFields<StoreScheduledDeliveryFeeEntity> = ['dateStart', 'dateEnd', 'timeStart', 'timeEnd', 'zipCodes', 'fee'];

  config: CrudConfig = {
    title: 'Scheduled Delivery Fee',
    plural: 'Scheduled Delivery Fee',
    single: 'Scheduled Delivery Fee',
  };

  columns: CrudColumn<StoreScheduledDeliveryFeeEntity>[] = [
    {
      label: 'Active From',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: StoreScheduledDeliveryFeeEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Active To',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: StoreScheduledDeliveryFeeEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Time start',
      isSortable: true,
      sortBy: 'timeStart',
      getField(item: StoreScheduledDeliveryFeeEntity): EntityValue {
        return item.timeStart;
      },
      type: 'text',
    },
    {
      label: 'Time end',
      isSortable: true,
      sortBy: 'timeEnd',
      getField(item: StoreScheduledDeliveryFeeEntity): EntityValue {
        return item.timeEnd;
      },
      type: 'text',
    },
    {
      label: 'zipCodes',
      isSortable: true,
      sortBy: 'zipCodes',
      getField(item: StoreScheduledDeliveryFeeEntity): EntityValue {
        return item.zipCodes;
      },
      type: 'tags',
    },
    {
      label: 'Fee',
      isSortable: true,
      sortBy: 'timeEnd',
      getField(item: StoreScheduledDeliveryFeeEntity): EntityValue {
        return item.fee?.toFixed(2);
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreScheduledDeliveryFeeService, public readonly storeDetailsService: StoreDetailsService) {}
}

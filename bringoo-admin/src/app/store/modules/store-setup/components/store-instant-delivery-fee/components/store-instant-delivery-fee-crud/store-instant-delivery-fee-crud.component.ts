import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreInstantDeliveryFeeService } from '../../../../../../../../shared/api/auth/crud-store-instant-delivery-fee.service';
import {
  StoreInstantDeliveryFeeCreateInput,
  StoreInstantDeliveryFeeEntity,
  StoreInstantDeliveryFeeUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreInstantDeliveryFeeCreateFormComponent } from '../store-instant-delivery-fee-create-form/store-instant-delivery-fee-create-form.component';
import { StoreInstantDeliveryFeeFilterFormComponent } from '../store-instant-delivery-fee-filter-form/store-instant-delivery-fee-filter-form.component';
import { StoreInstantDeliveryFeeUpdateFormComponent } from '../store-instant-delivery-fee-update-form/store-instant-delivery-fee-update-form.component';

@Component({
  selector: 'app-store-instant-delivery-fee-crud',
  templateUrl: './store-instant-delivery-fee-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreInstantDeliveryFeeCrudComponent {
  createForm: Type<DynamicForm<StoreInstantDeliveryFeeCreateInput>> = StoreInstantDeliveryFeeCreateFormComponent;
  updateForm: Type<DynamicForm<StoreInstantDeliveryFeeUpdateInput>> = StoreInstantDeliveryFeeUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreInstantDeliveryFeeFilterFormComponent;

  fields: CrudFields<StoreInstantDeliveryFeeEntity> = ['dateStart', 'dateEnd', 'timeStart', 'timeEnd', 'zipCodes', 'fee'];

  config: CrudConfig = {
    title: 'Instant Delivery Fee',
    plural: 'Instants Delivery Fee',
    single: 'Instants Delivery Fee',
  };

  columns: CrudColumn<StoreInstantDeliveryFeeEntity>[] = [
    {
      label: 'Active From',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: StoreInstantDeliveryFeeEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Active To',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: StoreInstantDeliveryFeeEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Time start',
      isSortable: true,
      sortBy: 'timeStart',
      getField(item: StoreInstantDeliveryFeeEntity): EntityValue {
        return item.timeStart;
      },
      type: 'text',
    },
    {
      label: 'Time end',
      isSortable: true,
      sortBy: 'timeEnd',
      getField(item: StoreInstantDeliveryFeeEntity): EntityValue {
        return item.timeEnd;
      },
      type: 'text',
    },
    {
      label: 'zipCodes',
      isSortable: true,
      sortBy: 'zipCodes',
      getField(item: StoreInstantDeliveryFeeEntity): EntityValue {
        return item.zipCodes;
      },
      type: 'tags',
    },
    {
      label: 'Fee',
      isSortable: true,
      sortBy: 'timeEnd',
      getField(item: StoreInstantDeliveryFeeEntity): EntityValue {
        return item.fee;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreInstantDeliveryFeeService, public readonly storeDetailsService: StoreDetailsService) {}
}

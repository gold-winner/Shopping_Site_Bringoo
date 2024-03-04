import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCommissionFeeStoreService } from '../../../../../../../../shared/api/auth/crud-commission-fee-store.service';
import {
  CommissionFeeStoreCreateInput,
  CommissionFeeStoreEntity,
  CommissionFeeStoreUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreCommissionFeeStoreCreateFormComponent } from '../store-commission-fee-store-create-form/store-commission-fee-store-create-form.component';
import { StoreCommissionFeeStoreFilterFormComponent } from '../store-commission-fee-store-filter-form/store-commission-fee-store-filter-form.component';
import { StoreCommissionFeeStoreUpdateFormComponent } from '../store-commission-fee-store-update-form/store-commission-fee-store-update-form.component';

@Component({
  selector: 'app-store-commission-fee-store-crud',
  templateUrl: './store-commission-fee-store-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeStoreCrudComponent {
  createForm: Type<DynamicForm<CommissionFeeStoreCreateInput>> = StoreCommissionFeeStoreCreateFormComponent;
  updateForm: Type<DynamicForm<CommissionFeeStoreUpdateInput>> = StoreCommissionFeeStoreUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreCommissionFeeStoreFilterFormComponent;
  fields: CrudFields<CommissionFeeStoreEntity> = ['dateStart', 'dateEnd', 'productCategoryCode', 'percent', 'min', 'max'];

  join: string[] = ['store'];

  config: CrudConfig = {
    title: 'Commission Fee Store',
    plural: 'Commission Fee Store',
    single: 'Commission Fee Store',
  };

  columns: CrudColumn<CommissionFeeStoreEntity>[] = [
    {
      label: 'Percent',
      isSortable: true,
      sortBy: 'percent',
      getField(item: CommissionFeeStoreEntity): EntityValue {
        return item.percent;
      },
      type: 'float2decimalplaces',
    },
    {
      label: 'Min',
      isSortable: true,
      sortBy: 'min',
      getField(item: CommissionFeeStoreEntity): EntityValue {
        return item.min;
      },
      type: 'float2decimalplaces',
    },
    {
      label: 'Max',
      isSortable: true,
      sortBy: 'max',
      getField(item: CommissionFeeStoreEntity): EntityValue {
        return item.max;
      },
      type: 'float2decimalplaces',
    },
    {
      label: 'Start Date',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: CommissionFeeStoreEntity): EntityValue {
        return item.dateStart;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'End Date',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: CommissionFeeStoreEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudCommissionFeeStoreService, public readonly storeDetailsService: StoreDetailsService) {}
}

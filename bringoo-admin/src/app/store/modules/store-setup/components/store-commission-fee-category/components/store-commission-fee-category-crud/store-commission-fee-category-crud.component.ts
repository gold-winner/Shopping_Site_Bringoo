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
import { StoreCommissionFeeCategoryCreateFormComponent } from '../store-commission-fee-category-create-form/store-commission-fee-category-create-form.component';
import { StoreCommissionFeeCategoryFilterFormComponent } from '../store-commission-fee-category-filter-form/store-commission-fee-category-filter-form.component';
import { StoreCommissionFeeCategoryUpdateFormComponent } from '../store-commission-fee-category-update-form/store-commission-fee-category-update-form.component';

@Component({
  selector: 'app-store-commission-fee-category-crud',
  templateUrl: './store-commission-fee-category-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeCategoryCrudComponent {
  createForm: Type<DynamicForm<CommissionFeeStoreCreateInput>> = StoreCommissionFeeCategoryCreateFormComponent;
  updateForm: Type<DynamicForm<CommissionFeeStoreUpdateInput>> = StoreCommissionFeeCategoryUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreCommissionFeeCategoryFilterFormComponent;

  fields: CrudFields<CommissionFeeStoreEntity> = ['dateStart', 'dateEnd', 'productCategoryCode', 'percent', 'min', 'max'];

  join: string[] = ['store', 'productCategory'];

  config: CrudConfig = {
    title: 'Commission Fee Category',
    plural: 'Commission Fee Categories',
    single: 'Commission Fee Category',
  };

  columns: CrudColumn<CommissionFeeStoreEntity>[] = [
    {
      label: 'Category',
      isSortable: true,
      sortBy: 'productCategoryCode',
      getField(item: CommissionFeeStoreEntity): EntityValue {
        return item.productCategory?.name_i18n;
      },
      type: 'text',
    },
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

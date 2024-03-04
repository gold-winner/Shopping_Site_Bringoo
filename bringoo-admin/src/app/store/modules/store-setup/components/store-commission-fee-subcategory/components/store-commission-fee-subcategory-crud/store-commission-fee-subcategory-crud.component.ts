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
import { StoreCommissionFeeSubcategoryCreateFormComponent } from '../store-commission-fee-subcategory-create-form/store-commission-fee-subcategory-create-form.component';
import { StoreCommissionFeeSubcategoryFilterFormComponent } from '../store-commission-fee-subcategory-filter-form/store-commission-fee-subcategory-filter-form.component';
import { StoreCommissionFeeSubcategoryUpdateFormComponent } from '../store-commission-fee-subcategory-update-form/store-commission-fee-subcategory-update-form.component';

@Component({
  selector: 'app-store-commission-fee-subcategory-crud',
  templateUrl: './store-commission-fee-subcategory-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeSubcategoryCrudComponent {
  createForm: Type<DynamicForm<CommissionFeeStoreCreateInput>> = StoreCommissionFeeSubcategoryCreateFormComponent;
  updateForm: Type<DynamicForm<CommissionFeeStoreUpdateInput>> = StoreCommissionFeeSubcategoryUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreCommissionFeeSubcategoryFilterFormComponent;

  fields: CrudFields<CommissionFeeStoreEntity> = ['dateStart', 'dateEnd', 'productSubcategoryCode', 'percent', 'min', 'max'];

  join: string[] = ['store', 'productSubcategory'];

  config: CrudConfig = {
    title: 'Commission Fee Subcategory',
    plural: 'Commission Fee Subcategories',
    single: 'Commission Fee Subcategory',
  };

  columns: CrudColumn<CommissionFeeStoreEntity>[] = [
    {
      label: 'Subcategory',
      isSortable: true,
      sortBy: 'productSubcategoryCode',
      getField(item: CommissionFeeStoreEntity): EntityValue {
        return item.productSubcategory?.name_i18n;
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

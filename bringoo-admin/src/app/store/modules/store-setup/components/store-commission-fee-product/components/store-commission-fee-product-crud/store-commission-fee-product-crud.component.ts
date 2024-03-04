import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CrudCommissionFeeStoreService } from '../../../../../../../../shared/api/auth/crud-commission-fee-store.service';
import { CommissionFeeStoreEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreCommissionFeeProductFilterFormComponent } from '../store-commission-fee-product-filter-form/store-commission-fee-product-filter-form.component';

@Component({
  selector: 'app-store-commission-fee-product-crud',
  templateUrl: './store-commission-fee-product-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeProductCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = StoreCommissionFeeProductFilterFormComponent;
  submitSymbol: symbol | undefined;
  openPanel: boolean = false;
  fields: CrudFields<CommissionFeeStoreEntity> = ['dateStart', 'dateEnd', 'percent', 'min', 'max'];
  reloadPage: symbol | undefined;

  join: string[] = ['store', 'product'];

  config: CrudConfig = {
    title: 'Commission Fee Product',
    plural: 'Commission Fee Products',
    single: 'Commission Fee Product',
    formWidth: 800,
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    onCreate: (input: any): Observable<CommissionFeeStoreEntity[]> => {
      return this.service.createMultiple(input).pipe(take(1));
    },
    actionsList: [
      {
        label: 'Create Commission fee product',
        action: (): void => {
          this.openPanel = true;
        },
      },
    ],
  };

  columns: CrudColumn<CommissionFeeStoreEntity>[] = [
    {
      label: 'Product',
      isSortable: true,
      sortBy: 'product.name_i18n',
      getField(item: CommissionFeeStoreEntity): EntityValue {
        return item.product?.name_i18n;
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

  onSubmit(): void {
    this.submitSymbol = Symbol('x');
    this.onCloseDrawer();
  }

  onCloseDrawer(): void {
    this.openPanel = false;
  }

  updateCrudData(): void {
    this.reloadPage = Symbol('i');
  }

  constructor(public readonly service: CrudCommissionFeeStoreService, public readonly storeDetailsService: StoreDetailsService) {}
}

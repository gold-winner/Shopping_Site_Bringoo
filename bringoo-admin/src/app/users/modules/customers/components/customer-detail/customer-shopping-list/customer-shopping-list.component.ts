import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudShoppingListService } from '../../../../../../../shared/api/auth/crud-shopping-list.service';
import { ShoppingListEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerShoppingDetailsFormComponent } from './customer-shopping-list-details-form/customer-shopping-list-details-form.component';
import { CustomerShoppingListFilterComponent } from './customer-shopping-list-filter/customer-shopping-list-filter.component';

@Component({
  selector: 'app-customer-shopping-list',
  templateUrl: './customer-shopping-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerShoppingListComponent {
  filterForm: Type<DynamicFilterFormComponent> = CustomerShoppingListFilterComponent;
  detailForm: Type<DynamicForm<any>> = CustomerShoppingDetailsFormComponent;

  fields: CrudFields<ShoppingListEntity> = ['name'];

  join: string[] = ['store||name_i18n', 'products||id', 'products.productLink'];

  config: CrudConfig = {
    title: 'Shopping list',
    plural: 'Shopping lists',
    single: 'Shopping list',
    isCreateButtonVisible: false,
    isEditSubmitButtonVisible: false,
    isDetailButtonVisible: true,
    isShowDefaultActions: true,
    useTableHeightCalculation: false,
    formWidth: 900,
    formBundleWidth: 900,
  };

  columns: CrudColumn<ShoppingListEntity>[] = [
    {
      label: 'Store Name',
      isSortable: true,
      sortBy: 'store.name_i18n',
      getField(item: ShoppingListEntity): EntityValue {
        return item.store?.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
      nzWidth: '150px',
    },
    {
      label: 'List name',
      isSortable: true,
      sortBy: 'name',
      getField(item: ShoppingListEntity): EntityValue {
        return item.name;
      },
      type: 'text',
    },
    {
      label: 'Items',
      isSortable: false,
      getField(item: ShoppingListEntity): EntityValue {
        return item?.products?.length || 0;
      },
      type: 'text',
      align: 'right',
    },
  ];

  constructor(public readonly service: CrudShoppingListService) {}
}

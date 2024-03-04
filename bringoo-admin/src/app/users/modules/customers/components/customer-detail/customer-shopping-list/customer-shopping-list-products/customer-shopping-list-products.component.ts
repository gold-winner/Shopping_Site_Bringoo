import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';

import { CrudShoppingListProductService } from '../../../../../../../../shared/api/auth/crud-shopping-list-product.service';
import { ShoppingListProductEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerShoppingListProductsFilterComponent } from '../customer-shopping-list-products-filter/customer-shopping-list-products-filter.component';

@Component({
  selector: 'app-customer-shopping-list-products',
  templateUrl: './customer-shopping-list-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerShoppingListProductsComponent {
  @Input() customFilters: any;

  filterForm: Type<DynamicFilterFormComponent> = CustomerShoppingListProductsFilterComponent;
  fields: CrudFields<ShoppingListProductEntity> = [];
  join: string[] = ['productLink', 'productLink.product', 'productLink.store'];

  config: CrudConfig = {
    title: 'Products',
    plural: 'Products',
    single: 'Product',
    isDeleteButtonVisible: false,
    isCreateButtonVisible: false,
    isEditButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<ShoppingListProductEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'store.name_i18n',
      getField(item: ShoppingListProductEntity): EntityValue {
        return item.productLink?.product?.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: ShoppingListProductEntity): EntityValue {
        return item.productLink?.product?.code;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'EAN',
      isSortable: true,
      sortBy: 'ean',
      getField(item: ShoppingListProductEntity): EntityValue {
        return item.productLink?.product?.ean;
      },
      type: 'text',
    },
    {
      label: 'Counter',
      isSortable: true,
      sortBy: 'counter',
      getField(item: ShoppingListProductEntity): EntityValue {
        return item.counter;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudShoppingListProductService) {}
}

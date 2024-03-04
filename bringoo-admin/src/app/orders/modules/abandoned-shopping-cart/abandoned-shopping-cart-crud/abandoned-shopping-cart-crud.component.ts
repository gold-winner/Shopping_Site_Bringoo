import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCartService } from '../../../../../shared/api/auth/crud-cart.service';
import { CartEntity } from '../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../shared/modules/crud/types/crud-select.type';
import { AbandonedShoppingCartFilterFormComponent } from '../abandoned-shopping-cart-filter-form/abandoned-shopping-cart-filter-form.component';

@Component({
  selector: 'app-abandoned-shopping-cart-crud',
  templateUrl: './abandoned-shopping-cart-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbandonedShoppingCartCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = AbandonedShoppingCartFilterFormComponent;

  fields: CrudFields<CartEntity> = [
    'id',
    'customerId',
    'create_date',
    'storeId',
    'isActive',
    'cartStatus',
    'totalAmount',
    'cartItemQuantity',
    'cartProductQuantity',
    'cartCode',
    'weight',
  ];

  join: string[] = ['customer', 'customer.settings', 'store||name_i18n'];

  config: CrudConfig = {
    title: 'Abandoned Cart',
    plural: 'Abandoned Carts',
    single: 'Abandoned Cart',
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    isDeleteButtonVisible: true,
    isShowDefaultActions: true,
    formWidth: 800,
  };

  columns: CrudColumn<CartEntity>[] = [
    {
      label: 'Cart Code',
      isSortable: true,
      sortBy: 'cartCode',
      getField(item: CartEntity): EntityValue {
        return item.cartCode;
      },
      type: 'link',
      link(item: CartEntity): string {
        return item.id;
      },
      fixedLeft: true,
    },
    {
      label: 'Is Active',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: CartEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Yes',
        falseText: 'No',
      },
    },
    {
      label: 'Date',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: CartEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Customer',
      isSortable: true,
      sortBy: 'customer.settings.firstName,customer.settings.lastName',
      getField(item: CartEntity): EntityValue {
        return `${item.customer?.settings?.firstName} ${item.customer?.role === 'CUSTOMER' ? item.customer?.settings?.lastName : ''}`;
      },
      type: 'link',
      link(item): string {
        return `/users/customers/details/${item.customerId}`;
      },
    },
    {
      label: 'Store',
      isSortable: true,
      sortBy: 'store.name_i18n',
      getField(item: CartEntity): EntityValue {
        return item.store?.name_i18n ?? '---';
      },
      type: 'link',
      link(item: CartEntity): string {
        if (item.store?.name_i18n) {
          return `/store/stores/${item.storeId}/basic-information`;
        }
        return `/store/stores/${item.storeId}/basic-information`;
      },
    },
    {
      label: 'Weight',
      isSortable: true,
      sortBy: 'weight',
      getField(item: CartEntity): EntityValue {
        return `${((item.weight ?? 0) / 1000).toFixed(2)} kg`;
      },
      type: 'text',
    },
    {
      label: 'Item Quantity',
      isSortable: true,
      sortBy: 'cartItemQuantity',
      getField(item: CartEntity): EntityValue {
        return item.cartItemQuantity;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'Product Quantity',
      isSortable: true,
      sortBy: 'cartProductQuantity',
      getField(item: CartEntity): EntityValue {
        return item.cartProductQuantity;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: CartEntity): EntityValue {
        return item.cartStatus;
      },
      type: 'text',
    },
    {
      label: 'Total',
      isSortable: true,
      sortBy: 'totalAmount',
      getField(item: CartEntity): EntityValue {
        return item.totalAmount ?? 0;
      },
      type: 'price',
      align: 'right',
    },
  ];

  constructor(public readonly service: CrudCartService) {}
}

import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CrudProductPriceService } from '../../../../../../../../../../shared/api/auth/crud-product-price.service';
import {
  ProductPriceCreateInput,
  ProductPriceEntity,
  ProductPriceUpdateInput,
} from '../../../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../../../services/store-details.service';
import { ProductPricingCreateFormComponent } from '../product-pricing-create-form/product-pricing-create-form.component';
import { ProductPricingFilterFormComponent } from '../product-pricing-filter-form/product-pricing-filter-form.component';
import { ProductPricingUpdateFormComponent } from '../product-pricing-update-form/product-pricing-update-form.component';

@Component({
  selector: 'app-product-pricing-crud',
  templateUrl: './product-pricing-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPricingCrudComponent {
  createForm: Type<DynamicForm<ProductPriceCreateInput>> = ProductPricingCreateFormComponent;
  updateForm: Type<DynamicForm<ProductPriceUpdateInput>> | undefined;
  filterForm: Type<DynamicFilterFormComponent> = ProductPricingFilterFormComponent;

  fields: CrudFields<ProductPriceEntity> = ['dateStart', 'dateEnd', 'price', 'productVatValue', 'note', 'type', 'productLinkId'];

  join: string[] = ['productLink', 'productLink.product||name_i18n'];

  config: CrudConfig = {
    title: 'Product Price',
    plural: 'Product Prices',
    single: 'Product Price',
    isCreateButtonVisible: !!this.route.snapshot.params['id'],
  };

  columns: CrudColumn<ProductPriceEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: ProductPriceEntity): EntityValue {
        return item.productLink?.product?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Price start date',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: ProductPriceEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Price end date',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: ProductPriceEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Price',
      isSortable: true,
      sortBy: 'price',
      getField(item: ProductPriceEntity): EntityValue {
        return item.price ?? 0;
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'VAT',
      isSortable: true,
      sortBy: 'productVatValue',
      getField(item: ProductPriceEntity): EntityValue {
        return item.productVatValue ?? 0;
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'Note',
      isSortable: true,
      sortBy: 'note',
      getField(item: ProductPriceEntity): EntityValue {
        return item.note;
      },
      type: 'text',
    },
    {
      label: 'Type',
      isSortable: true,
      sortBy: 'type',
      getField(item: ProductPriceEntity): EntityValue {
        return item.type;
      },
      type: 'text',
    },
  ];

  constructor(
    public readonly service: CrudProductPriceService,
    private readonly route: ActivatedRoute,
    public readonly storeDetailsService: StoreDetailsService,
  ) {
    if (this.route.snapshot.params['id']) {
      this.updateForm = ProductPricingUpdateFormComponent;
    }
  }
}

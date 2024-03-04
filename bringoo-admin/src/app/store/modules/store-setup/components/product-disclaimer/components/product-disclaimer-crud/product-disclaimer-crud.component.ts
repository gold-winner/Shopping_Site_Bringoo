import { ChangeDetectionStrategy, Component, Input, OnInit, Type } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

import { CrudProductDisclaimerService } from '../../../../../../../../shared/api/auth/crud-product-disclaimer.service';
import {
  ProductDisclaimerCreateInput,
  ProductDisclaimerEntity,
  ProductDisclaimerUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductDisclaimerCreateFormComponent } from '../product-disclaimer-create-form/product-disclaimer-create-form.component';
import { ProductDisclaimerFilterFormComponent } from '../product-disclaimer-filter-form/product-disclaimer-filter-form.component';
import { ProductDisclaimerUpdateFormComponent } from '../product-disclaimer-update-form/product-disclaimer-update-form.component';

@Component({
  selector: 'app-product-disclaimer-crud',
  templateUrl: './product-disclaimer-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDisclaimerCrudComponent implements OnInit {
  createForm!: Type<DynamicForm<ProductDisclaimerCreateInput>>;
  updateForm!: Type<DynamicForm<ProductDisclaimerUpdateInput>>;
  filterForm: Type<DynamicFilterFormComponent> = ProductDisclaimerFilterFormComponent;

  fields: CrudFields<ProductDisclaimerEntity> = [
    'isActive',
    'name_i18n',
    'dateStart',
    'code',
    'storeId',
    'delivery',
    'seller',
    'productId',
  ];

  join: string[] = ['store||name_i18n,logoUrl', 'product||name_i18n,imageUrls'];

  @Input() defaultFilters: any;
  @Input() showTitle: boolean = true;
  @Input() showStore: boolean = false;
  @Input() patchUrlQueryFromFilterForm: boolean = true;
  @Input() hideActions: boolean = false;

  config: CrudConfig = {
    title: 'Product Disclaimers',
    plural: 'Product Disclaimers',
    single: 'Product Disclaimer',
    isDetailButtonVisible: false,
    useTableHeightCalculation: false,
    formWidth: 900,
    onCreate: (input: any): Observable<any> | undefined => {
      return this.service.createMany(input);
    },
  };

  columns!: CrudColumn<ProductDisclaimerEntity>[];

  constructor(public readonly service: CrudProductDisclaimerService) {}

  ngOnInit(): void {
    this.config = {
      ...this.config,
      patchUrlQueryFromFilterForm: this.patchUrlQueryFromFilterForm,
    };
    this.columns = [
      {
        label: 'Name',
        isSortable: true,
        sortBy: 'name_i18n',
        getField(item: ProductDisclaimerEntity): EntityValue {
          return item.name_i18n;
        },
        type: 'text',
      },
      {
        label: 'Code',
        isSortable: true,
        sortBy: 'code',
        getField(item: ProductDisclaimerEntity): EntityValue {
          return item.code;
        },
        type: 'text',
      },
      {
        label: 'Seller',
        isSortable: true,
        sortBy: 'seller',
        getField(item: ProductDisclaimerEntity): EntityValue {
          return item.seller;
        },
        type: 'text',
      },
      {
        label: 'Delivery',
        isSortable: true,
        sortBy: 'delivery',
        getField(item: ProductDisclaimerEntity): EntityValue {
          return item.delivery;
        },
        type: 'text',
      },
      {
        label: 'Is Active',
        isSortable: true,
        sortBy: 'isActive',
        getField(item: ProductDisclaimerEntity): EntityValue {
          return item.isActive;
        },
        type: 'boolean',
        boolean: {
          trueText: 'Active',
          falseText: 'Inactive',
        },
      },
    ];

    if (this.showStore) {
      this.columns.unshift(
        {
          label: '',
          isSortable: false,
          getField(item: ProductDisclaimerEntity): EntityValue {
            return item.store?.logoUrl;
          },
          type: 'image',
        },
        {
          label: 'Store',
          isSortable: false,
          getField(item: ProductDisclaimerEntity): EntityValue {
            return item.store?.name_i18n;
          },
          type: 'link',
          link: (item: ProductDisclaimerEntity): string => {
            return `/store/stores/${item.storeId}/basic-information`;
          },
        },
      );
    } else {
      this.columns.unshift(
        {
          label: '',
          isSortable: false,
          getField(item: ProductDisclaimerEntity): EntityValue {
            return (item.product?.imageUrls ?? ['product image'])[0];
          },
          type: 'image',
        },
        {
          label: 'Product',
          isSortable: true,
          sortBy: 'product.name_i18n',
          getField(item: ProductDisclaimerEntity): EntityValue {
            return item.product?.name_i18n;
          },
          type: 'link',
          link(): string {
            return '/products/all';
          },
          getQueryParams(item: ProductDisclaimerEntity): Params {
            return { edit_entity_id_products: item.productId };
          },
        },
      );
    }
    if (this.showTitle) {
      this.createForm = ProductDisclaimerCreateFormComponent;
      this.updateForm = ProductDisclaimerUpdateFormComponent;
    }
    if (this.hideActions) {
      this.config = {
        ...this.config,
        isActionColumnVisible: false,
      };
    }
  }
}

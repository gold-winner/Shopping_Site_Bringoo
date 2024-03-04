import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CrudProductLinkService } from '../../../../../../shared/api/auth/crud-product-link.service';
import { ProductLinkEntity } from '../../../../../../shared/api/auth/data-contracts';
import { PRODUCT_LINK_TABLE_FIELDS } from '../../../../../../shared/config/product-link-table.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreProductLinkFilterFormComponent } from '../store-product-link-filter-form/store-product-link-filter-form.component';

@Component({
  selector: 'app-store-product-link-crud',
  templateUrl: './store-product-link-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = StoreProductLinkFilterFormComponent;

  submitSymbol: symbol | undefined;

  onSubmit(): void {
    this.submitSymbol = Symbol('x');
    this.onCloseDrawer();
  }

  onCloseDrawer(): void {
    this.openPanel = false;
  }

  fields: CrudFields<ProductLinkEntity> = PRODUCT_LINK_TABLE_FIELDS;
  join: string[] = [
    'store||name_i18n,id',
    'product||name_i18n,ean,productMeasurement,imageUrls',
    'product.productBrand||name_i18n',
    'product.subcategory||name_i18n',
    'product.category||name_i18n',
    'product.productUnit||name_i18n',
  ];

  customImportParams: any;

  config: CrudConfig = {
    title: 'Product Link',
    plural: 'Product Links',
    single: 'Product Link',
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    formWidth: 800,
  };

  openPanel: boolean = false;
  columns: CrudColumn<ProductLinkEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.imageUrls ? item.product.imageUrls[0] : '';
      },
      type: 'image',
      fixedLeft: true,
    },
    {
      label: 'Name',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return `${item.product?.name_i18n} \n Barcode (EAN) ${item.product?.ean}`;
      },
      type: 'link',
      link(item: ProductLinkEntity): string {
        return `./${item.id}`;
      },
      fixedLeft: true,
    },
    {
      label: 'Store',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.store?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Brand',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.productBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Category',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.category?.name_i18n ?? '';
      },
      type: 'text',
    },
    {
      label: 'Sub-category',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.subcategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Measurement',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return [item.product?.productMeasurement, `${item.product?.productUnit?.name_i18n}`].join('/');
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudProductLinkService, public readonly route: ActivatedRoute) {}
}

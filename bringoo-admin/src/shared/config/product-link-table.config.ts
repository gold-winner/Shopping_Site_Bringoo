import { ProductLinkEntity } from '../api/auth/data-contracts';
import { CrudColumn, EntityValue } from '../modules/crud/interfaces/crud-column';
import { CrudFields } from '../modules/crud/types/crud-select.type';

export const ProductLinkTableColumns: (link?: string) => CrudColumn<ProductLinkEntity>[] = (link?: string) => [
  {
    label: '',
    isSortable: false,
    getField(item: ProductLinkEntity): EntityValue {
      return item.product?.imageUrls ? item.product.imageUrls[0] : '';
    },
    type: 'image',
  },
  {
    label: 'Name',
    isSortable: false,
    getField(item: ProductLinkEntity): EntityValue {
      return `${item.product?.name_i18n} \n Barcode (EAN) ${item.product?.ean}`;
    },
    type: 'link',
    link(item: ProductLinkEntity): string {
      if (link) {
        return link;
      }
      return `./${item.id}`;
    },
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
  {
    label: 'Status',
    isSortable: true,
    sortBy: 'product.isActive',
    getField(item: ProductLinkEntity): EntityValue {
      return item.product?.isActive;
    },
    type: 'boolean',
    boolean: {
      trueText: 'Active',
      falseText: 'Inactive',
    },
  },
];

export const PRODUCT_LINK_TABLE_JOIN: string[] = [
  'product||name_i18n,ean,productMeasurement,imageUrls,isActive',
  'product.productBrand||name_i18n',
  'product.subcategory||name_i18n',
  'product.category||name_i18n',
  'product.productUnit||name_i18n',
];

export const PRODUCT_LINK_TABLE_FIELDS: CrudFields<ProductLinkEntity> = ['storeId', 'id'];

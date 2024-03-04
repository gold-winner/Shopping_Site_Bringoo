import { ProductEntity } from '../../api/auth/data-contracts';
import { ProductUnitsEnum } from '../../enums/product-units.enum';
import { CrudColumn, EntityValue } from '../../modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../modules/crud/interfaces/crud-config';
import { CrudFields } from '../../modules/crud/types/crud-select.type';

export const FIELDS: CrudFields<ProductEntity> = [
  'name_i18n',
  'isActive',
  'sku',
  'isPickAndDrive',
  'imageUrls',
  'productMeasurement',
  'productUnitCode',
  'productVatPercent',
  'ean',
  'defaultPrice',
  'productBrandCode',
];

export const JOIN: string[] = [
  'productBrand||name_i18n',
  'category||name_i18n',
  'category.vendorCategory||name_i18n',
  'deposit||itemDepositValueGross,boxDepositValueGross',
  'subcategory||name_i18n',
];

export const CONFIG: CrudConfig = {
  title: 'Products',
  plural: 'Products',
  single: 'Product',
  formWidth: 1000,
  formBundleWidth: 600,
};

export const COLUMNS: CrudColumn<ProductEntity>[] = [
  {
    label: '',
    isSortable: false,
    getField(item: ProductEntity): EntityValue {
      return item.imageUrls ? item.imageUrls[0] : 'error';
    },
    type: 'image',
  },
  {
    label: 'Name',
    isSortable: true,
    sortBy: 'name_i18n',
    getField(item: ProductEntity): EntityValue {
      return item.name_i18n;
    },
    type: 'text',
  },
  {
    label: 'Default price',
    isSortable: true,
    sortBy: 'defaultPrice',
    getField(item: ProductEntity): EntityValue {
      return item.defaultPrice ?? 0;
    },
    type: 'price',
    align: 'right',
  },
  {
    label: 'Deposit',
    isSortable: true,
    sortBy: 'deposit.itemDepositValueGross',
    getField(item: ProductEntity): EntityValue {
      return item?.deposit?.itemDepositValueGross ?? 0;
    },
    type: 'price',
    align: 'right',
  },
  {
    label: 'Box deposit',
    isSortable: false,
    getField(item: ProductEntity): EntityValue {
      return item?.deposit?.boxDepositValueGross ?? 0;
    },
    type: 'price',
    align: 'right',
  },
  {
    label: 'Unit',
    isSortable: true,
    sortBy: 'productMeasurement',
    getField(item: ProductEntity): EntityValue {
      return `${item.productMeasurement} ${ProductUnitsEnum[item.productUnitCode]}`;
    },
    type: 'text',
    align: 'right',
  },
  {
    label: 'VAT',
    isSortable: true,
    sortBy: 'productVatPercent',
    getField(item: ProductEntity): EntityValue {
      return `${item.productVatPercent}%`;
    },
    type: 'text',
    align: 'right',
  },
  {
    label: 'Status',
    isSortable: true,
    sortBy: 'isActive',
    getField(item: ProductEntity): EntityValue {
      return item.isActive;
    },
    type: 'boolean',
    boolean: {
      trueText: 'Active',
      falseText: 'Inactive',
    },
  },
  {
    label: 'Brand',
    isSortable: true,
    sortBy: 'productBrandCode',
    getField(item: ProductEntity): EntityValue {
      return item.productBrand?.name_i18n;
    },
    type: 'text',
  },
  {
    label: 'Category',
    isSortable: false,
    getField(item: ProductEntity): EntityValue {
      return `${item.category?.name_i18n} (${item.category?.vendorCategory?.name_i18n})`;
    },
    type: 'text',
  },
  {
    label: 'Subcategory',
    isSortable: false,
    getField(item: ProductEntity): EntityValue {
      return item.subcategory?.name_i18n;
    },
    type: 'text',
  },
  {
    label: 'EAN',
    isSortable: false,
    getField(item: ProductEntity): EntityValue {
      return item.ean;
    },
    type: 'text',
  },
];

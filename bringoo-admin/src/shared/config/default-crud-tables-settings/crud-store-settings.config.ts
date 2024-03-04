import { StoreEntity } from '../../api/auth/data-contracts';
import { CrudConfig } from '../../modules/crud/interfaces/crud-config';
import { CrudFields } from '../../modules/crud/types/crud-select.type';

export const CrudStoreConfig: CrudConfig = {
  title: 'Store',
  plural: 'Stores',
  single: 'Store',
};

export const CrudStoreFields: CrudFields<StoreEntity> = ['name_i18n', 'isActive', 'logoUrl', 'storeBrandCode', 'deleted_date'];

export const CrudStoreJoin: string[] = [
  'storeBrand||name_i18n',
  'addresses||addressType,streetName,streetNumber',
  'region||name_i18n',
  'vendorType||name_i18n',
  'corporate||name_i18n',
];

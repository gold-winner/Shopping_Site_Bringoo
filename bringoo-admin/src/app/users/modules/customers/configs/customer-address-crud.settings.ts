import { CustomerAddressEntity } from '../../../../../shared/api/auth/data-contracts';
import { CrudColumn, EntityValue } from '../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../shared/modules/crud/types/crud-select.type';

export const CustomerAddressCrudSettings: {
  fields: CrudFields<CustomerAddressEntity>;
  join: string[];
  config: CrudConfig;
  columns: CrudColumn<CustomerAddressEntity>[];
} = {
  fields: [
    'addressName',
    'streetName',
    'streetNumber',
    'zipCode',
    'city',
    'state',
    'deliveryComment',
    'addressType',
    'isDefault',
    'organizationName',
    'organizationTaxId',
  ],
  join: ['country||name_i18n', 'location'],
  config: {
    title: 'Customer address',
    plural: 'Customer addresses',
    single: 'Customer address',
    formWidth: 1200,
    nzScrollX: '1500px',
  },
  columns: [
    {
      label: 'Address name',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.addressName;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Type',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.addressType;
      },
      type: 'text',
    },
    {
      label: 'Default',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.isDefault;
      },
      type: 'boolean',
      boolean: {
        trueText: 'yes',
        falseText: 'no',
      },
      nzWidth: '100px',
    },
    {
      label: 'Street',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return `${item.streetName} ${item.streetNumber}`;
      },
      type: 'text',
    },
    {
      label: 'ZIP Code',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.zipCode;
      },
      type: 'text',
    },
    {
      label: 'City',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.city;
      },
      type: 'text',
    },
    {
      label: 'Comment for delivery',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.deliveryComment || '---';
      },
      type: 'text',
      nzWidth: '200px',
    },
    {
      label: 'State',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.state ?? '--';
      },
      type: 'text',
    },
    {
      label: 'Country',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.country?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Organization Name',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.organizationName;
      },
      type: 'text',
    },
    {
      label: 'Organization Tax Id',
      isSortable: false,
      getField(item: CustomerAddressEntity): EntityValue {
        return item.organizationTaxId;
      },
      type: 'text',
    },
  ],
};

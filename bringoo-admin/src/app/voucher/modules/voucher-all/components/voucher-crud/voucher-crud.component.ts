import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudVoucherService } from '../../../../../../shared/api/auth/crud-voucher.service';
import { VoucherCreateInput, VoucherEntity, VoucherUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { VoucherCreateFormComponent } from '../voucher-create-form/voucher-create-form.component';
import { VoucherFilterFormComponent } from '../voucher-filter-form/voucher-filter-form.component';
import { VoucherUpdateFormComponent } from '../voucher-update-form/voucher-update-form.component';

@Component({
  selector: 'app-voucher-crud',
  templateUrl: './voucher-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoucherCrudComponent {
  createForm: Type<DynamicForm<VoucherCreateInput>> = VoucherCreateFormComponent;
  updateForm: Type<DynamicForm<VoucherUpdateInput>> = VoucherUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = VoucherFilterFormComponent;

  fields: CrudFields<VoucherEntity> = ['isActive', 'code', 'voucherType', 'dateStart', 'dateEnd', 'create_date'];
  join: string[] = ['freeShipping', 'discount', 'manager', 'usages', 'manager.settings'];

  config: CrudConfig = {
    title: 'Vouchers',
    plural: 'Vouchers',
    single: 'Voucher',
    isDragged: false,
    formWidth: 1000,
  };

  columns: CrudColumn<VoucherEntity>[] = [
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: VoucherEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Code',
      isSortable: false,
      sortBy: 'customer.settings.firstName, customer.settings.lastName',
      getField(item: VoucherEntity): EntityValue {
        return `${item.code}`;
      },
      type: 'link',
      link(item: VoucherEntity): string {
        return `details/${item.id}`;
      },
    },
    {
      label: 'Usage Total',
      isSortable: false,
      getField(item: VoucherEntity): EntityValue {
        return `${item?.usages?.length || 0}`;
      },
      type: 'text',
    },
    {
      label: 'Type',
      isSortable: true,
      sortBy: 'voucherType',
      getField(item: VoucherEntity): EntityValue {
        return `${item.voucherType}`;
      },
      type: 'text',
    },
    {
      label: 'Manager',
      isSortable: true,
      sortBy: 'manager.settings.firstName, manager.settings.lastName',
      getField(item: VoucherEntity): EntityValue {
        return `${item.manager?.settings?.firstName} ${item.manager?.settings?.lastName}`;
      },
      type: 'link',
      link(item: VoucherEntity): string {
        return `/users/managers/details/${item.manager?.id}`;
      },
    },
    {
      label: 'Start Date',
      isSortable: false,
      getField(item: VoucherEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'End Date',
      isSortable: false,
      getField(item: VoucherEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudVoucherService) {}
}

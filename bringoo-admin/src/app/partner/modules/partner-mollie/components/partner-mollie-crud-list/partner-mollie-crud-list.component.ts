import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudMolliePartnerService } from '../../../../../../shared/api/auth/crud-mollie-partner.service';
import {
  MolliePartnerAddressDto,
  MolliePartnerEntity,
  MolliePartnerStoresUpdateInput,
} from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { PartnerMollieFilterFormComponent } from '../partner-mollie-filter-form/partner-mollie-filter-form.component';
import { PartnerMollieUpdateFormComponent } from '../partner-mollie-update-form/partner-mollie-update-form.component';

@Component({
  selector: 'app-consultation-request-crud-list',
  templateUrl: './partner-mollie-crud-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerMollieCrudListComponent {
  updateForm: Type<DynamicForm<MolliePartnerStoresUpdateInput>> = PartnerMollieUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = PartnerMollieFilterFormComponent;
  join: string[] = ['stores'];

  config: CrudConfig = {
    title: 'Mollie Partners',
    plural: 'Mollie Partners',
    single: 'Mollie Partner',
  };

  columns: CrudColumn<MolliePartnerEntity>[] = [
    {
      label: 'ID',
      isSortable: false,
      getField(item: MolliePartnerEntity): EntityValue {
        return item.organizationId;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name',
      getField(item: MolliePartnerEntity): EntityValue {
        return item.name;
      },
      type: 'text',
    },
    {
      label: 'Email',
      isSortable: true,
      sortBy: 'email',
      getField(item: MolliePartnerEntity): EntityValue {
        return item.email;
      },
      type: 'text',
    },
    {
      label: 'Address',
      isSortable: false,
      getField(item: MolliePartnerEntity): EntityValue {
        return Object.getOwnPropertyNames(item.address).reduce((acc: string, key: string) => {
          const field: keyof MolliePartnerAddressDto = key as keyof MolliePartnerAddressDto;

          if (item.address && item.address[field]) {
            const value: string = item.address[field] || '';
            acc += acc ? `, ${value}` : value;
          }

          return acc;
        }, '');
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudMolliePartnerService) {}
}

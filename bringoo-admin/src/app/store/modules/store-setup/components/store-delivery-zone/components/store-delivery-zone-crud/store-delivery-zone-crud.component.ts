import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreDeliveryZoneService } from '../../../../../../../../shared/api/auth/crud-store-delivery-zone.service';
import {
  StoreDeliveryZoneCreateInput,
  StoreDeliveryZoneEntity,
  StoreDeliveryZoneUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreDeliveryZoneCreateFormComponent } from '../store-delivery-zone-create-form/store-delivery-zone-create-form.component';
import { StoreDeliveryZoneFilterFormComponent } from '../store-delivery-zone-filter-form/store-delivery-zone-filter-form.component';
import { StoreDeliveryZoneUpdateFormComponent } from '../store-delivery-zone-update-form/store-delivery-zone-update-form.component';

@Component({
  selector: 'app-store-delivery-zone-crud',
  templateUrl: './store-delivery-zone-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDeliveryZoneCrudComponent {
  createForm: Type<DynamicForm<StoreDeliveryZoneCreateInput>> = StoreDeliveryZoneCreateFormComponent;
  updateForm: Type<DynamicForm<StoreDeliveryZoneUpdateInput>> = StoreDeliveryZoneUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreDeliveryZoneFilterFormComponent;

  fields: CrudFields<StoreDeliveryZoneEntity> = [
    'deliveryTime',
    'dateStart',
    'dateEnd',
    'defaultFee',
    'isInstantDelivery',
    'zipCodes',
    'isPublicDisplay',
  ];

  join: string[] = ['country||name_i18n'];

  config: CrudConfig = {
    title: 'Delivery Zone',
    plural: 'Delivery Zones',
    single: 'Delivery Zone',
    formWidth: 800,
  };

  columns: CrudColumn<StoreDeliveryZoneEntity>[] = [
    {
      label: 'Country',
      isSortable: false,
      getField(item: StoreDeliveryZoneEntity): EntityValue {
        return item.country?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Zip codes',
      isSortable: true,
      sortBy: 'zipCodes',
      getField(item: StoreDeliveryZoneEntity): EntityValue {
        return item.zipCodes;
      },
      type: 'tags',
    },
    {
      label: 'Delivery Time',
      isSortable: true,
      sortBy: 'deliveryTime',
      getField(item: StoreDeliveryZoneEntity): EntityValue {
        return `${item.deliveryTime} min`;
      },
      type: 'text',
    },
    {
      label: 'Start Date (Active from)',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: StoreDeliveryZoneEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'End Date (Active to)',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: StoreDeliveryZoneEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Default Delivery fee',
      isSortable: true,
      sortBy: 'defaultFee',
      getField(item: StoreDeliveryZoneEntity): EntityValue {
        return `${item?.defaultFee} EUR`;
      },
      type: 'text',
    },
    {
      label: 'Instant Delivery',
      isSortable: true,
      sortBy: 'isInstantDelivery',
      getField(item: StoreDeliveryZoneEntity): EntityValue {
        return item.isInstantDelivery;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Yes',
        falseText: 'No',
      },
    },
    {
      label: 'Is Public Display',
      isSortable: true,
      sortBy: 'isPublicDisplay',
      getField(item: StoreDeliveryZoneEntity): EntityValue {
        return item.isPublicDisplay;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Yes',
        falseText: 'No',
      },
    },
  ];

  constructor(public readonly service: CrudStoreDeliveryZoneService, public readonly storeDetailsService: StoreDetailsService) {}
}

import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudRatingAppHistoryService } from '../../../../../../../shared/api/auth/crud-rating-app-history.service';
import { RatingAppHistoryEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerRatingAppHistoryFilterComponent } from './customer-rating-app-history-filter/customer-rating-app-history-filter.component';

@Component({
  selector: 'app-customer-rating-app-history',
  templateUrl: './customer-rating-app-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerRatingAppHistoryComponent {
  filterForm: Type<DynamicFilterFormComponent> = CustomerRatingAppHistoryFilterComponent;
  fields: CrudFields<RatingAppHistoryEntity> = ['rating', 'deviceOs', 'appVersion', 'note', 'create_date'];

  join: string[] = ['customer||role', 'customer.settings||firstName,lastName'];

  config: CrudConfig = {
    title: 'App Rating histories',
    plural: 'App Rating histories',
    single: 'App Rating history',
    isDeleteButtonVisible: false,
    isDetailButtonVisible: false,
    isEditButtonVisible: false,
    isEditSubmitButtonVisible: false,
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<RatingAppHistoryEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'customer.settings.firstName,customer.settings.lastName',
      getField(item: RatingAppHistoryEntity): EntityValue {
        return `${item.customer?.settings?.firstName} ${item.customer?.role === 'GUEST' ? '' : item.customer?.settings?.lastName}`;
      },
      type: 'link',
      link(item: RatingAppHistoryEntity): any {
        return `../../users/customers/details/${item.customer?.id}`;
      },
      fixedLeft: true,
    },
    {
      label: 'Rating',
      isSortable: true,
      sortBy: 'rating',
      getField(item: RatingAppHistoryEntity): EntityValue {
        return item.rating;
      },
      type: 'text',
    },
    {
      label: 'Device Os',
      isSortable: true,
      sortBy: 'deviceOs',
      getField(item: RatingAppHistoryEntity): EntityValue {
        return item.deviceOs;
      },
      type: 'text',
    },
    {
      label: 'App Version',
      isSortable: false,
      getField(item: RatingAppHistoryEntity): EntityValue {
        return item.appVersion;
      },
      type: 'text',
    },
    {
      label: 'Note',
      isSortable: false,
      getField(item: RatingAppHistoryEntity): EntityValue {
        return item.note;
      },
      type: 'text',
    },
    {
      label: 'Date',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: RatingAppHistoryEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudRatingAppHistoryService) {}
}

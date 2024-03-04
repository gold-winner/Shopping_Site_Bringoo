import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreClosingDayService } from '../../../../../../../../shared/api/auth/crud-store-closing-day.service';
import {
  StoreClosingDayCreateInput,
  StoreClosingDayEntity,
  StoreClosingDayUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreClosingDaysCreateFormComponent } from '../store-closing-days-create-form/store-closing-days-create-form.component';
import { StoreClosingDaysFilterFormComponent } from '../store-closing-days-filter-form/store-closing-days-filter-form.component';
import { StoreClosingDaysUpdateFormComponent } from '../store-closing-days-update-form/store-closing-days-update-form.component';

@Component({
  selector: 'app-store-closing-days-crud',
  templateUrl: './store-closing-days-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreClosingDaysCrudComponent {
  createForm: Type<DynamicForm<StoreClosingDayCreateInput>> = StoreClosingDaysCreateFormComponent;
  updateForm: Type<DynamicForm<StoreClosingDayUpdateInput>> = StoreClosingDaysUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreClosingDaysFilterFormComponent;

  fields: CrudFields<StoreClosingDayEntity> = ['dateStart', 'dateEnd', 'note'];

  config: CrudConfig = {
    title: 'Store closing days',
    plural: 'Store closing days',
    single: 'Store closing day',
  };

  columns: CrudColumn<StoreClosingDayEntity>[] = [
    {
      label: 'Date From',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: StoreClosingDayEntity): EntityValue {
        return item?.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Date To',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: StoreClosingDayEntity): EntityValue {
        return item?.dateEnd;
      },
      type: 'text',
    },
    {
      label: 'Comment',
      isSortable: false,
      getField(item: StoreClosingDayEntity): EntityValue {
        return item?.note;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreClosingDayService, public readonly storeDetailsService: StoreDetailsService) {}
}

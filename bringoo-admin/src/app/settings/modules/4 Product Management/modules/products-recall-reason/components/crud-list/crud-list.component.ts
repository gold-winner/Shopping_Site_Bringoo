import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductRecallReasonService } from '../../../../../../../../shared/api/auth/crud-product-recall-reason.service';
import {
  ProductRecallReasonCreateInput,
  ProductRecallReasonEntity,
  ProductRecallReasonUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductRecallReasonCreateFormComponent } from '../create-form/create-form.component';
import { ProductRecallReasonFilterFormComponent } from '../filter-form/filter-form.component';
import { ProductRecallReasonUpdateFormComponent } from '../update-form/update-form.component';

@Component({
  selector: 'app-products-recall-reason-crud-list',
  templateUrl: './crud-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecallReasonCrudListComponent {
  createForm: Type<DynamicForm<ProductRecallReasonCreateInput>> = ProductRecallReasonCreateFormComponent;
  updateForm: Type<DynamicForm<ProductRecallReasonUpdateInput>> = ProductRecallReasonUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductRecallReasonFilterFormComponent;

  fields: CrudFields<ProductRecallReasonEntity> = ['name_i18n', 'code', 'isActive'];

  config: CrudConfig = {
    title: 'Recall Reason',
    plural: 'Recall Reasons',
    single: 'Recall Reason',
  };

  columns: CrudColumn<ProductRecallReasonEntity>[] = [
    {
      label: 'Name',
      isSortable: false,
      getField(item: ProductRecallReasonEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Code',
      isSortable: false,
      getField(item: ProductRecallReasonEntity): EntityValue {
        return item.code;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Status',
      isSortable: false,
      sortBy: 'isActive',
      getField(item: ProductRecallReasonEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Not active',
      },
    },
  ];

  constructor(public readonly service: CrudProductRecallReasonService) {}
}

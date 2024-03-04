import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductLegalService } from '../../../../../../../../shared/api/auth/crud-product-legal.service';
import {
  ProductLegalCreateInput,
  ProductLegalEntity,
  ProductLegalUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductLegalFormCreateComponent } from '../product-legal-form-create/product-legal-form-create.component';
import { ProductLegalFormFilterComponent } from '../product-legal-form-filter/product-legal-form-filter.component';
import { ProductLegalFormUpdateComponent } from '../product-legal-form-update/product-legal-form-update.component';

@Component({
  selector: 'app-product-legal-crud',
  templateUrl: 'product-legal-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLegalCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = ProductLegalFormFilterComponent;
  createForm: Type<DynamicForm<ProductLegalCreateInput>> = ProductLegalFormCreateComponent;
  updateForm: Type<DynamicForm<ProductLegalUpdateInput>> = ProductLegalFormUpdateComponent;

  fields: CrudFields<ProductLegalEntity> = ['code', 'isActive', 'name_i18n', 'startDateTime'];

  config: CrudConfig = {
    title: 'Product Legal',
    plural: 'Product Legal',
    single: 'Product Legal',
    formWidth: '90%',
  };

  columns: CrudColumn<ProductLegalEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ProductLegalEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: ProductLegalEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Start Date Time',
      isSortable: true,
      sortBy: 'startDateTime',
      getField(item: ProductLegalEntity): EntityValue {
        return item.startDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudProductLegalService) {}
}

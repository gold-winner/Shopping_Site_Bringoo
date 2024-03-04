import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudStoreLoyaltyProgramService } from '../../../../../../../../shared/api/auth/crud-store-loyalty-program.service';
import { StoreLoyaltyProgramEntity, StoreLoyaltyProgramManyCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreLoyaltyProgramCreateFormComponent } from '../store-loyalty-program-create-form/store-loyalty-program-create-form.component';
import { StoreLoyaltyProgramFilterComponent } from '../store-loyalty-program-filter/store-loyalty-program-filter.component';

@Component({
  selector: 'app-store-product-management-crud',
  templateUrl: './store-loyalty-program-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreLoyaltyProgramCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = StoreLoyaltyProgramFilterComponent;
  createForm: Type<DynamicForm<StoreLoyaltyProgramManyCreateInput>> = StoreLoyaltyProgramCreateFormComponent;

  fields: CrudFields<StoreLoyaltyProgramEntity> = ['isActive'];
  join: string[] = ['loyaltyProgram'];
  openPanel: boolean = false;

  config: CrudConfig = {
    title: 'Store loyalty programs',
    plural: 'Store loyalty programs',
    single: 'Store loyalty program',
    isEditButtonVisible: false,
    formWidth: 800,
    onCreate: (input: StoreLoyaltyProgramManyCreateInput): Observable<StoreLoyaltyProgramEntity[]> => {
      return this.service.createManyForStore(input);
    },
  };

  columns: CrudColumn<StoreLoyaltyProgramEntity>[] = [
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: StoreLoyaltyProgramEntity): EntityValue {
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
      isSortable: true,
      sortBy: 'loyaltyProgram.code',
      getField(item: StoreLoyaltyProgramEntity): EntityValue {
        return `${item.loyaltyProgram?.code}`;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'loyaltyProgram.name_i18n',
      getField(item: StoreLoyaltyProgramEntity): EntityValue {
        return `${item.loyaltyProgram?.name_i18n}`;
      },
      type: 'text',
    },
    {
      label: 'Description',
      isSortable: true,
      sortBy: 'loyaltyProgram.description_i18n',
      getField(item: StoreLoyaltyProgramEntity): EntityValue {
        return `${item.loyaltyProgram?.description_i18n}`;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreLoyaltyProgramService, public readonly storeDetailsService: StoreDetailsService) {}
}

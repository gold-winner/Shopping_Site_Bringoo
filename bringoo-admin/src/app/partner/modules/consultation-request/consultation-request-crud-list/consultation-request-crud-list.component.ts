import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { Params } from '@angular/router';

import { CrudProductConsultationRequestService } from '../../../../../shared/api/auth/crud-product-consultation-request.service';
import { ProductConsultationRequestEntity } from '../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../shared/modules/crud/types/crud-select.type';
import { ConsultationRequestDetailsComponent } from '../consultation-request-details/consultation-request-details.component';
import { ConsultationRequestFilterFormComponent } from '../consultation-request-filter-form/consultation-request-filter-form.component';

@Component({
  selector: 'app-consultation-request-crud-list',
  templateUrl: './consultation-request-crud-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationRequestCrudListComponent {
  filterForm: Type<DynamicFilterFormComponent> = ConsultationRequestFilterFormComponent;
  detailForm: Type<DynamicForm<ProductConsultationRequestEntity>> = ConsultationRequestDetailsComponent;
  join: string[] = ['store||name_i18n', 'product', 'customer||email', 'customer.settings||firstName,lastName'];
  fields: CrudFields<ProductConsultationRequestEntity> = [
    'productId',
    'customerId',
    'storeId',
    'callbackDateTime',
    'isSend',
    'create_date',
    'productConsultationType',
    'consultationRequestNumber',
  ];

  config: CrudConfig = {
    title: 'Consultation Request',
    plural: 'Consultation Requests',
    single: 'Consultation Request',
    isCreateButtonVisible: false,
    isDetailButtonVisible: true,
  };

  columns: CrudColumn<ProductConsultationRequestEntity>[] = [
    {
      label: 'Consultation Number',
      isSortable: true,
      sortBy: 'consultationRequestNumber',
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return item.consultationRequestNumber;
      },
      type: 'text',
    },
    {
      label: 'Partner Store',
      isSortable: false,
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return item.store?.name_i18n;
      },
      type: 'link',
      link(item: ProductConsultationRequestEntity): any {
        return `/store/stores/${item.storeId}/basic-information`;
      },
    },
    {
      label: 'Customer',
      isSortable: false,
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return `${item.customer?.settings?.firstName} ${item.customer?.settings?.lastName}`;
      },
      type: 'link',
      link(item: ProductConsultationRequestEntity): any {
        return `/users/customers/details/${item.customerId}`;
      },
    },
    {
      label: 'Product',
      isSortable: false,
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return `${item.product?.name_i18n}`;
      },
      type: 'link',
      link(): string {
        return `/products/all`;
      },
      getQueryParams(item: ProductConsultationRequestEntity): Params {
        return {
          edit_entity_id_products: item.productId,
        };
      },
    },
    {
      label: 'Request Number',
      isSortable: false,
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return item.consultationRequestNumber;
      },
      type: 'text',
    },
    {
      label: 'Date submit',
      isSortable: false,
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Type',
      isSortable: true,
      sortBy: 'productConsultationType',
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return item.productConsultationType;
      },
      type: 'text',
    },
    {
      label: 'Callback date and time',
      isSortable: false,
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return item.callbackDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Send',
      isSortable: true,
      getField(item: ProductConsultationRequestEntity): EntityValue {
        return item.isSend;
      },
      type: 'boolean',
      boolean: {
        falseText: 'Not Send',
        trueText: 'Is Send',
      },
    },
  ];

  constructor(public readonly service: CrudProductConsultationRequestService) {}
}

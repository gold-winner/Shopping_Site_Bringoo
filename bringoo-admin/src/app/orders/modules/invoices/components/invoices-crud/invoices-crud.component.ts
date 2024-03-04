import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { take, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { FindInput, OrderEntity, OrderTransactionEntity, SendAllInvoicesDto } from '../../../../../../shared/api/auth/data-contracts';
import { InvoiceService } from '../../../../../../shared/api/auth/invoice.service';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { saveBlobAsFile } from '../../../../../../shared/helpers/file-saver';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { InvoicesFilterFormComponent } from '../invoices-filter-form/invoices-filter-form.component';

@Component({
  selector: 'app-invoices-crud',
  templateUrl: './invoices-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = InvoicesFilterFormComponent;
  filter: FindInput = {};

  fields: CrudFields<OrderEntity> = [
    'orderNumber',
    'orderTransactions',
    'orderStatus',
    'storeId',
    'customerId',
    'totalAmount',
    'invoiceNumber',
    'invoiceDate',
  ];

  join: string[] = [
    'customer',
    'customer.settings',
    'store',
    'orderBillingAddress||firstName,lastName,customerNumber',
    'orderTransactions||paymentMethod,currencyCode',
  ];

  config: CrudConfig = {
    title: 'Invoices',
    plural: 'Invoices',
    single: 'Invoice',
    isActionColumnVisible: false,
    isCreateButtonVisible: false,
    isShowDefaultActions: false,
    actionsList: [
      {
        label: 'Send all invoices',
        action: (): void => {
          this.invoiceService
            .sendAllInvoices()
            .subscribe(({ invoiceCount }: SendAllInvoicesDto) =>
              this.notificationService.success('Send all invoices', `Sent ${invoiceCount} invoices by email`),
            );
        },
      },
      {
        label: 'Download selected invoices',
        noSelectionDisable: true,
        action: (setOfChecked: Set<string>): void => {
          this.invoiceService
            .invoiceExportByIds({ ids: [...setOfChecked.values()] })
            .pipe(
              take(1),
              tap((response: any) => {
                saveBlobAsFile(response, 'application/zip', 'invoices.zip');
              }),
            )
            .subscribe();
        },
      },
      {
        label: 'Download all invoices',
        action: (): void => {
          this.invoiceService
            .invoiceExportFiltered(this.filter)
            .pipe(
              take(1),
              tap((response: any) => {
                saveBlobAsFile(response, 'application/zip', 'invoices.zip');
              }),
            )
            .subscribe();
        },
      },
    ],
  };

  onFilterChanges({ s, join }: FindInput): void {
    this.filter = { s, join };
  }

  columns: CrudColumn<OrderEntity>[] = [
    {
      label: 'Invoice ID',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        item.orderStatus;
        return item?.invoiceNumber;
      },
      type: 'link',
      link(item: OrderEntity): string {
        return `./detail/${item?.id}`;
      },
    },
    {
      label: 'Order ID',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return item?.orderNumber;
      },
      type: 'link',
      link(item: OrderEntity): string {
        return `../all/detail/${item?.id}`;
      },
    },
    {
      label: 'Customer Name',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return `${item?.orderBillingAddress?.firstName} ${item?.orderBillingAddress?.lastName}`;
      },
      type: 'link',
      link(item: OrderEntity): string {
        return `../../users/customers/details/${item?.customerId}`;
      },
    },
    {
      label: 'Customer Number',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return item.orderBillingAddress?.customerNumber;
      },
      type: 'link',
      link(item: OrderEntity): string {
        return `../../users/customers/details/${item?.customerId}`;
      },
    },
    {
      label: 'Store Name',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return item?.store?.name_i18n;
      },
      type: 'link',
      link(item: OrderEntity): string {
        return `../../store/stores/${item?.storeId}/basic-information`;
      },
    },
    {
      label: 'Invoice Date',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return item?.invoiceDate;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Payment Type',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return item?.orderTransactions?.map(({ paymentMethod }: OrderTransactionEntity) => paymentMethod);
      },
      type: 'text[]',
    },
    {
      label: 'Invoice Total',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return item?.orderTransactions?.map(({ currencyCode }: OrderTransactionEntity) => `${item.totalAmount ?? '0.00'} ${currencyCode}`);
      },
      type: 'text[]',
      align: 'right',
    },
  ];

  constructor(
    public readonly crudOrderService: CrudOrderService,
    public readonly invoiceService: InvoiceService,
    private readonly notificationService: NzNotificationService,
  ) {}
}

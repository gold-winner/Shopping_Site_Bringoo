import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppManagerPriceRequestService } from '../../../../../../shared/api/auth/app-manager-price-request.service';
import { CrudProductPriceRequestService } from '../../../../../../shared/api/auth/crud-product-price-request.service';
import { PriceTypeEnum, ProductPriceEntity, ProductPriceRequestEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductPriceApproveComponent } from '../product-price-approve/product-price-approve.component';
import { ProductPriceRequestFilterComponent } from '../product-price-request-filter/product-price-request-filter.component';

@Component({
  selector: 'app-product-price-request',
  templateUrl: './product-price-request-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPriceRequestCrudComponent {
  detailForm: Type<DynamicForm<ProductPriceRequestEntity>> = ProductPriceApproveComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductPriceRequestFilterComponent;

  reloadPage: symbol | undefined;

  config: CrudConfig = {
    title: 'Product Price Request',
    plural: 'Product Price Requests',
    single: 'Product Price Request',
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    subTitle: 'This page will show all price requests send by staff members. It requires to be accepted or declined.',
    formWidth: 800,
    isDetailButtonVisible: true,
    actionsList: [
      {
        label: 'Reject',
        action: (setOfChecked: Set<string>): void => {
          this.appManagerPriceRequestService.rejectManyPriceRequests({ ids: [...setOfChecked] }).subscribe(() => {
            this.reloadPage = Symbol('reload');
            this.changeDetection.detectChanges();
          });
        },
      },
    ],
  };

  openPanel: boolean = false;

  fields: CrudFields<ProductPriceRequestEntity> = ['newPrice', 'create_date', 'dateStart', 'dateEnd', 'staffId', 'productLinkId', 'status'];
  join: string[] = [
    'productLink||storeId',
    'productLink.product||name_i18n,defaultPrice',
    'productLink.store||name_i18n',
    'productLink.prices||type,price',
    'staff||id',
    'staff.settings||firstName,lastName',
  ];

  columns: CrudColumn<ProductPriceRequestEntity>[] = [
    {
      label: 'Product Name',
      isSortable: true,
      sortBy: 'productLink.product.name_i18n',
      getField(item: ProductPriceRequestEntity): EntityValue {
        return item.productLink?.product?.name_i18n;
      },
      type: 'link',
      link({ productLinkId, productLink }: ProductPriceRequestEntity): string {
        return `/store/stores/${productLink?.storeId}/product-link/${productLinkId}`;
      },
    },
    {
      label: 'Store Name',
      isSortable: false,
      getField(item: ProductPriceRequestEntity): EntityValue {
        return item.productLink?.store?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'New Price',
      isSortable: true,
      sortBy: 'newPrice',
      getField(item: ProductPriceRequestEntity): EntityValue {
        return item.newPrice;
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'Old Sale Price',
      isSortable: false,
      getField(item: ProductPriceRequestEntity): EntityValue {
        return (
          item.productLink?.prices?.find(({ type }: ProductPriceEntity) => type === PriceTypeEnum.SALE)?.price ??
          item.productLink?.product?.defaultPrice ??
          0
        );
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'Current regular price',
      isSortable: false,
      getField(item: ProductPriceRequestEntity): EntityValue {
        return (
          item.productLink?.prices?.find(({ type }: ProductPriceEntity) => type === PriceTypeEnum.REGULAR)?.price ??
          item.productLink?.product?.defaultPrice ??
          0
        );
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'New Price start',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: ProductPriceRequestEntity): EntityValue {
        return item.dateStart;
      },
      type: 'date',
    },
    {
      label: 'New Price end',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: ProductPriceRequestEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'date',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'status',
      getField(item: ProductPriceRequestEntity): EntityValue {
        return item.status;
      },
      type: 'text',
    },
    {
      label: 'Date of request',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: ProductPriceRequestEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'User requested',
      isSortable: true,
      sortBy: 'staff.settings.firstName,staff.settings.lastName',
      getField(item: ProductPriceRequestEntity): EntityValue {
        return `${item.staff?.settings?.firstName} ${item.staff?.settings?.lastName}`;
      },
      type: 'link',
      link(item: ProductPriceRequestEntity): string {
        return `/users/staff/details/${item.staffId}`;
      },
    },
  ];

  constructor(
    public readonly service: CrudProductPriceRequestService,
    public readonly route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private readonly appManagerPriceRequestService: AppManagerPriceRequestService,
  ) {}
}

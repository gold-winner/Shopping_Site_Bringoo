import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CrudCustomerAddressService } from '../../../../../../../../shared/api/auth/crud-customer-address.service';
import {
  CustomerAddressCreateInput,
  CustomerAddressEntity,
  CustomerAddressUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { OrderUpdateService } from '../../../../../../../../shared/api/auth/order-update.service';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerAddressCrudSettings } from '../../../../../../../users/modules/customers/configs/customer-address-crud.settings';
import { CustomerIdService } from '../services/customer-id-service';
import { SelectCustomerAddressCreateFormComponent } from './select-customer-address-create-form/select-customer-address-create-form.component';
import { SelectCustomerAddressFilterFormComponent } from './select-customer-address-filter-form/select-customer-address-filter-form.component';
import { SelectCustomerAddressUpdateFormComponent } from './select-customer-address-update-form/select-customer-address-update-form.component';

@UntilDestroy()
@Component({
  selector: 'app-select-customer-address',
  templateUrl: './select-customer-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomerAddressComponent implements OnInit {
  @Input() openPanel: boolean = false;
  @Input() customerId: string = '';
  @Input() orderId: string = '';
  @Input() field: 'orderDeliveryAddressId' | 'orderBillingAddressId' = 'orderDeliveryAddressId';
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  filterForm: Type<DynamicFilterFormComponent> = SelectCustomerAddressFilterFormComponent;
  createForm: Type<DynamicForm<CustomerAddressCreateInput>> = SelectCustomerAddressCreateFormComponent;
  updateForm: Type<DynamicForm<CustomerAddressUpdateInput>> = SelectCustomerAddressUpdateFormComponent;

  customerAddressChecked: string = '';

  fields: CrudFields<CustomerAddressEntity> = CustomerAddressCrudSettings.fields;
  join: string[] = CustomerAddressCrudSettings.join;
  config: CrudConfig = {
    ...CustomerAddressCrudSettings.config,
    patchUrlQueryFromFilterForm: false,
  };

  columns: CrudColumn<CustomerAddressEntity>[] = CustomerAddressCrudSettings.columns;

  checkbox(dd: any): void {
    this.customerAddressChecked = dd.length > 0 ? dd[0] : '';
  }

  onSubmit(): void {
    if (this.customerAddressChecked) {
      if (this.field === 'orderDeliveryAddressId') {
        this.orderUpdateService
          .deliveryAddressChange(this.orderId, { customerId: this.customerId, addressId: this.customerAddressChecked })
          .subscribe(
            () => {
              this.submit.emit(true);
              this.notification.success('Update delivery address', 'Successfully updated.');
            },
            (err: HttpErrorResponse) => this.notification.error('Update delivery address', err.message),
          );
      } else {
        this.orderUpdateService
          .billingAddressChange(this.orderId, { customerId: this.customerId, addressId: this.customerAddressChecked })
          .subscribe(
            () => {
              this.submit.emit(true);
              this.notification.success('Update billing address', 'Successfully updated.');
            },
            (err: HttpErrorResponse) => this.notification.error('Update billing address', err.message),
          );
      }
    }
  }

  onCloseDrawer(): void {
    this.submit.emit(false);
  }

  constructor(
    public readonly service: CrudCustomerAddressService,
    public readonly orderUpdateService: OrderUpdateService,
    private customerIdService: CustomerIdService,
    private readonly notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.customerIdService.customerId = this.customerId;
  }
}

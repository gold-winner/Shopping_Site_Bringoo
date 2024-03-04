import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { CrudCustomerService } from '../../../../../../../../shared/api/auth/crud-customer.service';
import { CustomerAddressCreateInput, CustomerEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { SelectCustomerAddressCreateFormComponent } from '../select-customer-address/select-customer-address-create-form/select-customer-address-create-form.component';
import { CustomerIdService } from '../services/customer-id-service';
import { SelectCustomerFilterFormComponent } from './select-customer-filter-form/select-customer-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomerComponent implements OnInit {
  @Input() openPanel: boolean = false;
  @Output() submit: EventEmitter<CustomerEntity | undefined> = new EventEmitter<CustomerEntity | undefined>();

  readonly filterForm: Type<DynamicFilterFormComponent> = SelectCustomerFilterFormComponent;
  readonly createForm: Type<DynamicForm<CustomerAddressCreateInput>> = SelectCustomerAddressCreateFormComponent;

  readonly fields: CrudFields<CustomerEntity> = ['id'];

  readonly join: string[] = ['settings||firstName,lastName,customerNumber'];
  selectedCustomerId: string | null = null;
  private readonly customerSearching: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  crudConfig: CrudConfig = {
    title: 'Customer',
    plural: 'Customers',
    single: 'Customer',
    isActionColumnVisible: false,
    patchUrlQueryFromFilterForm: false,
  };

  crudColumn: CrudColumn<CustomerEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: CustomerEntity): EntityValue {
        return `${item.settings?.firstName} ${item.settings?.lastName}`;
      },
      type: 'text',
    },
    {
      label: 'Customer number',
      isSortable: false,
      getField(item: CustomerEntity): EntityValue {
        return item.settings?.customerNumber;
      },
      type: 'text',
    },
  ];

  ngOnInit(): void {
    this.customerSearching
      .pipe(
        untilDestroyed(this),
        filter((id: string | null) => id !== null),
        map((v: string | null): string => {
          return v || '';
        }),
        switchMap((id: string) => this.service.findOne(id, { join: ['settings'] })),
      )
      .subscribe((customer: CustomerEntity) => {
        this.submit.emit(customer);
        this.customerIdService.customerId = customer.id;
      });
  }

  onSearchCustomer(): void {
    this.customerSearching.next(this.selectedCustomerId);
  }

  onCloseDrawer(): void {
    this.submit.emit();
  }

  constructor(public readonly service: CrudCustomerService, private customerIdService: CustomerIdService) {}
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import {
  CustomerAddressEntity,
  CustomerEntity,
  StaffEntity,
  StoreAddressEntity,
  StoreEntity,
} from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-order-create',
  template: '',
  styleUrls: ['./order-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCreateComponent implements OnInit {
  openPanel: 'customer' | 'deliveryAddress' | 'billingAddress' | 'store' | 'storeAddress' | 'receipt' | 'picker' | 'driver' | undefined;
  form!: UntypedFormGroup;

  constructor(private readonly fb: UntypedFormBuilder, private crudOrderService: CrudOrderService) {}

  summary = [
    { label: 'Order number', value: 'asdasdasda' },
    { label: 'Created', value: 'asdasd' },
    { label: 'Status', value: 'asdasd' },
    { label: 'Total amount', value: 'asdasd' },
    { label: 'Amount captured', value: 'asdasd' },
    { label: 'Customer', value: 'asdasd' },
    { label: 'Metadata', value: 'asdasd' },
    { label: 'Store receipt amount', value: 'asdasd' },
    { label: 'Store receipt number ', value: 'asdasd' },
  ];

  receipt: { subtotal: number; taxes: number } = {
    subtotal: 0,
    taxes: 0,
  };

  orderJobs = [
    {
      label: 'Start picking',
      value: 'Сompleted 100% (Friday, 2020-01-01 13:23:23)',
      percent: 100,
    },
    {
      label: 'End picking',
      value: 'In progress 80% (6/7)',
      percent: 80,
    },
    {
      label: 'Start in-shop payment',
      value: 'Not started',
      percent: 0,
    },
    {
      label: 'End of shopping',
      value: 'Not started',
      percent: 0,
    },
    {
      label: 'Start delivery',
      value: 'Not started',
      percent: 0,
    },
    {
      label: 'End delivery',
      value: 'Not started',
      percent: 0,
    },
  ];

  images: string[] = [
    'https://404store.com/2017/04/08/ejderha-dragon.jpg',
    'https://avatars.mds.yandex.net/get-pdb/2812922/f9df5969-5eca-4563-9ad3-df2d3f3647c6/s1200?webp=false',
    'https://i.ytimg.com/vi/A6O12lSAa7Y/maxresdefault.jpg',
    'https://i.pinimg.com/736x/a3/fe/74/a3fe740f6436c9c7142489026c7c662c--fantasy-dragon-dragon-art.jpg',
    'https://i.pinimg.com/736x/2d/db/d5/2ddbd576facb89e32991e3cf48ec328c.jpg',
    'https://happypik.ru/wp-content/uploads/2019/09/drakony106.jpg',
    'https://avavatar.ru/images/full/29/q7dRwrncM5uPjHR3.jpg',
  ];

  customer: CustomerEntity | any = {};

  deliveryAddress: CustomerAddressEntity | any = {};
  billingAddress: CustomerAddressEntity | any = {};

  store: StoreEntity | any = {};
  storeAddress: StoreAddressEntity | any = {};

  picker: StaffEntity | any = {};
  driver: StaffEntity | any = {};

  onCustomerSelect(value: CustomerEntity | undefined): void {
    if (value) {
      this.customer = value;
      this.form.patchValue({ customerId: value.id });
    }
    this.onCloseDrawer();
  }

  onCustomerAddressSelect(value: CustomerAddressEntity | undefined): void {
    if (value) {
      this.deliveryAddress = value;
      this.form.patchValue({ orderDeliveryAddressId: value.id });
    }
    this.onCloseDrawer();
  }

  onCustomerBillingSelect(value: CustomerAddressEntity | undefined): void {
    if (value) {
      this.billingAddress = value;
      this.form.patchValue({ orderBillingAddressId: value.id });
    }
    this.onCloseDrawer();
  }

  onStoreSelected(value: StoreEntity | undefined): void {
    if (value) {
      this.store = value;
      this.form.patchValue({ storeId: value.id, currencyCode: value.currencyCode });
    }
    this.onCloseDrawer();
  }

  onStoreAddressSelected(value: StoreAddressEntity | undefined): void {
    if (value) {
      this.storeAddress = value;
    }
    this.onCloseDrawer();
  }

  onPickerSelected(value: StaffEntity | undefined): void {
    if (value) {
      this.picker = value;
    }
    this.onCloseDrawer();
  }

  onDriverSelected(value: StaffEntity | undefined): void {
    if (value) {
      this.driver = value;
    }
    this.onCloseDrawer();
  }

  onReceiptSubmit(value: number | undefined): void {
    if (value) {
      this.form.patchValue({ receiptNumber: value });
    }
    this.onCloseDrawer();
  }

  onCloseDrawer(): void {
    this.openPanel = undefined;
  }

  onCreateOrder(): void {
    this.crudOrderService.create(this.form.value).subscribe();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      note: [null, []],
      receiptNumber: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
      orderDeliveryAddressId: [null, [Validators.required]],
      orderBillingAddressId: [null, [Validators.required]],
      storeId: [null, [Validators.required]],
      currencyCode: [null, [Validators.required]],
    });
  }
}

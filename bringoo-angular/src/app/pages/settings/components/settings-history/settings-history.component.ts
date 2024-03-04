import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { ProductsDetailData } from 'src/app/example/components/cards/cards.mock';
import { AppOrder } from 'src/shared/api/app-order';
import { AppOrderControllerActiveParams, PageableActiveOrderDto } from 'src/shared/api/data-contracts';

import { IOption } from '../../../../../shared/components/option';
@Component({
  selector: 'ui-settings-history',
  templateUrl: './settings-history.component.html',
  styleUrls: ['./settings-history.component.scss'],
})
export class SettingsHistoryComponent implements OnInit {
  productsDetail = null;
  selectedOption: string = 'all';
  options: IOption[] = [];
  category: string = 'done';
  selectedOrder: string = '';
  productsSelected: string = '';
  orderStatus: string = '';
  orders: Array<{ id: string; status: string }> = [];
  orders_data: PageableActiveOrderDto | undefined;

  constructor(private ref: ChangeDetectorRef, public readonly appOrder: AppOrder) {
    const data: AppOrderControllerActiveParams = {
      limit: 10,
      page: 1,
    };
    this.appOrder.active(data).subscribe(
      (res: PageableActiveOrderDto) => {
        this.orders_data = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onChangeOption(option: string): void {
    this.selectedOption = option;
  }

  onSelectOrder(order: string): void {
    this.selectedOrder = order;
    this.orderStatus = '';
    this.productsSelected = '';
  }

  onProductSelect(order: string): void {
    this.productsSelected = order;
  }

  onOrderStatusClick(order: string): void {
    this.orderStatus = order;
  }

  onChangeCategory(selectedCategory: string): void {
    this.category = selectedCategory;
  }

  ngOnInit(): void {
    this.options = [
      {
        id: 'all',
        label: 'All',
      },
      {
        id: 'pending',
        label: 'Pending',
      },
      {
        id: 'closed',
        label: 'Closed',
      },
      {
        id: 'cancelled',
        label: 'Cancelled',
      },
    ];

    this.orders = [
      {
        id: '1',
        status: 'pending',
      },
      {
        id: '2',
        status: 'delivered',
      },
      {
        id: '3',
        status: 'delivered',
      },
      {
        id: '4',
        status: 'not_submit',
      },
      {
        id: '5',
        status: 'delivered',
      },
      {
        id: '6',
        status: 'delivered',
      },
      {
        id: '7',
        status: 'delivered',
      },
      {
        id: '8',
        status: 'delivered',
      },
      {
        id: '9',
        status: 'delivered',
      },
      {
        id: '10',
        status: 'delivered',
      },
      {
        id: '11',
        status: 'not_submit',
      },
    ];
  }
}

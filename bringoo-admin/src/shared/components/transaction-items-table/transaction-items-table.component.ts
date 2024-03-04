import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DeliveryFeeDto, OrderItemDto, OrderStatusEnum, TotalVatDto } from '../../api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../config/constants.config';

@Component({
  selector: 'app-transaction-items-table',
  templateUrl: 'transaction-items-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class TransactionItemsTableComponent {
  completeOrderStatus: OrderStatusEnum = OrderStatusEnum.COMPLETE;
  @Input() transactionItems: OrderItemDto[] = [];
  @Input() useRefund: boolean = false;
  @Input() orderStatus!: OrderStatusEnum;
  @Input() checkedItems!: Set<string>;

  @Input() totalAmount: string = '';
  @Input() totalRefund: string = '';
  @Input() totalDeposit: string = '';
  @Input() totalVats: TotalVatDto[] = [];
  @Input() deliveryFee: DeliveryFeeDto | undefined;
  @Input() itemsDiscount: string = '';
  @Input() deliveryFeeDiscount: string = '';
  @Input() allDiscount: string = '';

  @Output() addChecked: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() deleteChecked: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() showProductDetail: EventEmitter<string> = new EventEmitter<string>();

  dateFormat: string = DATE_TIME_FORMAT;
  selectedAll: boolean = false;

  onAllChecked(status: boolean): void {
    this.selectedAll = status;
    if (status) {
      const addSelections: string[] = [];
      for (const { orderItemId, quantity, quantityRefund } of this.transactionItems) {
        if (quantity !== quantityRefund) {
          addSelections.push(orderItemId);
        }
      }
      this.addChecked.emit(addSelections);
    } else {
      this.deleteChecked.emit(this.transactionItems.map(({ orderItemId }: OrderItemDto) => orderItemId));
    }
  }

  onItemChecked(id: string, status: boolean): void {
    if (status) {
      this.addChecked.emit([id]);
    } else {
      this.deleteChecked.emit([id]);
    }
  }

  onClickProductDetails(linkId?: string): void {
    if (linkId) {
      this.showProductDetail.emit(linkId);
    }
  }
}

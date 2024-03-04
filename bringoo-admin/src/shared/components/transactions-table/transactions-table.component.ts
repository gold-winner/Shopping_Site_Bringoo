import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { AppManagerCartService } from '../../api/auth/app-manager-cart.service';
import { AppManagerOrderVoucherService } from '../../api/auth/app-manager-order-voucher.service';
import {
  OrderItemDto,
  OrderLineInput,
  OrderStatusEnum,
  OrderTransactionDto,
  OrderTransactionStatusEnum,
  TotalVatDto,
} from '../../api/auth/data-contracts';
import { OrderReplacementService } from '../../api/auth/order-replacement.service';
import { OrderUpdateService } from '../../api/auth/order-update.service';
import { DATE_FORMAT } from '../../config/constants.config';
import { ORDER_CANCEL_STATUSES } from '../../config/order-cancel-statuses.config';

@UntilDestroy()
@Component({
  selector: 'app-order-basket-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['transaction-table.component.scss'],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent implements OnInit {
  completeOrderStatus: OrderStatusEnum = OrderStatusEnum.COMPLETE;
  disableRefundDeliveryDee: OrderStatusEnum[] = [OrderStatusEnum.NEW];

  @Input() isInvoice: boolean = false;

  @Input() subTotal!: string;
  @Input() vatTotal!: TotalVatDto[];
  @Input() totalDeposit!: string;
  @Input() deliveryPrice!: string;
  @Input() grandTotal!: string;
  @Input() totalRefund!: string;
  @Input() orderStatus!: OrderStatusEnum;
  @Input() orderId!: string;
  @Input() hasActiveReplacement!: boolean;
  @Input() transactions!: OrderTransactionDto[];
  @Input() useRefundFunctions: boolean = false;
  @Input() deliveryVatRate!: number;
  @Input() deliveryVatAmount!: string;
  @Input() itemsDiscount!: string;
  @Input() deliveryFeeDiscount!: string;
  @Input() allDiscount!: string;
  @Input() deliveryFee!: number;

  @Output() reloadTable: EventEmitter<void> = new EventEmitter<void>();

  dateFormat: string = DATE_FORMAT;

  transactionsItemsFields: string[] = [
    'id',
    'quantity',
    'quantityFound',
    'quantityRefund',
    'productLinkId',
    'name_i18n',
    'customerNote',
    'weight',
    'productVatPercent',
    'price',
  ];

  selectedAll: boolean = false;
  selectedTransactions: Set<string> = new Set();
  selectedProducts: Set<string> = new Set<string>();
  canceledStatuses: Set<OrderStatusEnum> = ORDER_CANCEL_STATUSES;
  openRefundSettings: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  refundItems$!: Observable<OrderItemDto[]>;
  productLinkId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  form: UntypedFormGroup = this.fb.group({
    refund: this.fb.array([]),
  });

  get refundControls(): UntypedFormArray {
    return this.form.get('refund') as UntypedFormArray;
  }

  transactionsExpand: Set<string> = new Set<string>();

  confirmRefundDeliveryFeePanel: 'show' | 'hide' = 'hide';

  constructor(
    private readonly orderUpdate: OrderUpdateService,
    private readonly fb: UntypedFormBuilder,
    private readonly appManagerCartService: AppManagerCartService,
    private readonly appManagerOrderVoucherService: AppManagerOrderVoucherService,
    private readonly orderReplacementService: OrderReplacementService,
    private readonly notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.transactionsExpand.add(this.transactions[this.transactions.length - 1].id);
    this.observeRefundItems();
  }

  observeRefundItems(): void {
    this.refundItems$ = this.openRefundSettings.asObservable().pipe(
      filter(Boolean),
      map((): OrderItemDto[] =>
        this.transactions.flatMap((trans: OrderTransactionDto): OrderItemDto[] =>
          trans.orderTransactionItems.filter(({ orderItemId }: OrderItemDto) => this.selectedProducts.has(orderItemId)),
        ),
      ),
      tap((items: OrderItemDto[]) => this.rebuildForm(items)),
    );
  }

  rebuildForm(items: OrderItemDto[]): void {
    this.refundControls.clear();
    for (let i: number = 0; i < items.length; i++) {
      this.refundControls.push(this.fb.control(1, [Validators.required]));
    }
  }

  onAllTransactionChecked(status: boolean, transactions: OrderTransactionDto[]): void {
    this.selectedAll = status;
    if (status) {
      for (const { orderTransactionItems, id } of transactions) {
        for (const { orderItemId, quantity, quantityRefund } of orderTransactionItems ?? []) {
          if (quantity !== quantityRefund) {
            this.selectedProducts.add(orderItemId);
          }
        }
        this.selectedTransactions.add(id);
      }
    } else {
      this.selectedTransactions.clear();
      this.selectedProducts.clear();
    }
    this.reloadSets();
  }

  addCheckedOrderItems(ids: string[]): void {
    for (const id of ids) {
      this.selectedProducts.add(id);
    }
    this.reloadSets();
  }

  deleteCheckedOrderItems(ids: string[]): void {
    for (const id of ids) {
      this.selectedProducts.delete(id);
    }
    this.reloadSets();
  }

  onOpenRefundDriver(): void {
    this.openRefundSettings.next(true);
  }

  sendSmsWithPaymentLink(orderTransactionId: string): void {
    this.appManagerCartService.sendSmsWithPaymentLink(orderTransactionId).subscribe((response: any) => {
      if (response) {
        this.notification.success('Sent', `SMS with payment link is sent`);
      }
    });
  }

  canSendVoiceCallReplacementReminder(): boolean {
    const hasNotReadedReplacementTransaction: boolean = this.transactions.some(
      ({ orderTransactionStatus, orderReplacementMessageReadCounter }: OrderTransactionDto) =>
        orderTransactionStatus === OrderTransactionStatusEnum.REPLACEMENT && orderReplacementMessageReadCounter === 0,
    );

    return hasNotReadedReplacementTransaction && this.hasActiveReplacement;
  }

  sendVoiceCallReplacementReminder(): void {
    const replacementTransaction: OrderTransactionDto | undefined = this.transactions.find(
      ({ orderTransactionStatus }: OrderTransactionDto) => orderTransactionStatus === OrderTransactionStatusEnum.REPLACEMENT,
    );

    if (replacementTransaction?.orderReplacementId) {
      this.appManagerCartService
        .sendOrderReplacementReminderVoiceCall(replacementTransaction.orderReplacementId)
        .subscribe((response: any) => {
          if (response) {
            this.notification.success('Sent', `Voice call replacement reminder is sent if customer phone number is verified`);
          }
        });
    }
  }

  onCloseRefundDriver(): void {
    this.openRefundSettings.next(false);
  }

  onSubmit(): void {
    for (const control of this.refundControls.controls) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
    if (this.form.valid) {
      const refundItems: OrderLineInput[] = this.transactions
        .flatMap((trans: OrderTransactionDto): OrderItemDto[] => {
          return trans.orderTransactionItems.filter(({ orderItemId }: OrderItemDto) => this.selectedProducts.has(orderItemId));
        })
        .map(
          ({ orderItemId }: OrderItemDto, index: number): OrderLineInput => {
            return {
              orderItemId,
              quantity: this.refundControls.at(index).value,
            };
          },
        );

      this.orderUpdate
        .refundItems(this.orderId, {
          refundItems,
        })
        .pipe(untilDestroyed(this), take(1))
        .subscribe(() => {
          this.openRefundSettings.next(false);
          this.selectedProducts.clear();
          this.reloadTable.emit();
        });
    }
  }

  onTransactionExpandChange(id: string, status: boolean): void {
    if (status) {
      this.transactionsExpand.add(id);
    } else {
      this.transactionsExpand.delete(id);
    }
  }

  onTransactionChecked(items: OrderItemDto[], status: boolean): void {
    for (const { orderItemId } of items) {
      if (status) {
        for (const { orderItemId, quantity, quantityRefund } of items) {
          if (quantity !== quantityRefund) {
            this.selectedProducts.add(orderItemId);
          }
        }
        this.selectedTransactions.add(orderItemId);
      } else {
        for (const { orderItemId } of items) {
          this.selectedProducts.delete(orderItemId);
        }
        this.selectedTransactions.delete(orderItemId);
      }
    }
    this.reloadSets();
  }

  onTerminateActiveReplacement(): void {
    this.orderReplacementService.terminate(this.orderId).subscribe(() => {
      this.notification.success('Terminate order replacement.', 'Terminate successful.');
      this.reloadTable.emit();
    });
  }

  onShowProductDetail(linkId: string): void {
    this.productLinkId.next(linkId);
  }

  onCloseProductDetail(): void {
    this.productLinkId.next(null);
  }

  reloadSets(): void {
    this.selectedProducts = new Set(this.selectedProducts);
    this.selectedTransactions = new Set(this.selectedTransactions);
  }

  onRefundDeliveryFeeButtonClick(): void {
    this.confirmRefundDeliveryFeePanel = 'show';
  }

  onHideRefundDeliveryFeeModal(): void {
    this.confirmRefundDeliveryFeePanel = 'hide';
  }

  onRefundDeliveryFee(): void {
    this.orderUpdate.refundOrderDeliveryFee(this.orderId).subscribe(() => {
      this.notification.success('Refund Delivery Fee', 'Successfully update');
      this.reloadTable.emit();
      this.confirmRefundDeliveryFeePanel = 'hide';
    });
  }
}

import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { isAfter } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { OrderDetailsDto, OrderEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { ORDER_END_STATUSES } from '../../../../../../shared/config/order-end-statuses.config';

@Component({
  selector: 'app-board-card',
  templateUrl: 'board-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['border-card.component.scss'],
  animations: [
    trigger('card', [
      transition(':enter', [style({ height: 0 }), animate('0.3s ease-in', style({ height: '*' }))]),
      transition(':leave', [animate('0.3s ease-out', style({ transform: 'scale(0)', height: 0 }))]),
    ]),
  ],
  host: { style: 'display: block' },
})
export class BoardCardComponent implements OnInit {
  @Input() order!: OrderEntity;
  orderDetails$!: Observable<OrderDetailsDto>;
  loadJobs$!: Observable<OrderEntity>;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showMoreInfo: boolean = false;
  showDetails: boolean = false;
  dateTimeFormat: string = DATE_TIME_FORMAT;
  dateFormat: string = DATE_FORMAT;
  isLateOrder: boolean = false;
  isInProgressOrder: boolean = false;

  constructor(private readonly service: CrudOrderService) {}

  onOpenMoreInfo(): void {
    this.showMoreInfo = true;
    this.isLoading.next(true);
  }

  onCloseMoreInfo(): void {
    this.showMoreInfo = false;
  }

  onOpenDetails(): void {
    this.showDetails = true;
    this.isLoading.next(true);
  }

  onCloseDetails(): void {
    this.showDetails = false;
  }

  ngOnInit(): void {
    this.orderDetails$ = this.service.details(this.order.id).pipe(tap(() => this.isLoading.next(false)));
    this.loadJobs$ = this.service.findOne(this.order.id, {
      fields: '',
      join: ['jobs||jobType,completeDateTime', 'jobs.staff'],
    });
    this.checkActualTime();
  }

  checkActualTime(): void {
    if (!this.order.orderStatus) return;
    this.isInProgressOrder = !ORDER_END_STATUSES.has(this.order.orderStatus);
    if (ORDER_END_STATUSES.has(this.order.orderStatus)) {
      this.isLateOrder = isAfter(new Date(`${this.order.deliveryDateTimeTo}`), new Date(`${this.order.actualDeliveryTime}`));
      return;
    }
    this.isLateOrder = isAfter(new Date(), new Date(`${this.order.deliveryDateTimeTo}`));
  }
}

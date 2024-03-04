import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzImageService } from 'ng-zorro-antd/image';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { OrderHistoryDto, OrderHistoryEventTypeEnum } from '../../../../../../../../shared/api/auth/data-contracts';
import { OrderHistoryService } from '../../../../../../../../shared/api/auth/order-history.service';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';

@UntilDestroy()
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistoryComponent implements OnInit {
  @Input() set updateOrderHistory(update: symbol | null) {
    this._updateOrderHistory.next(true);
  }

  @Input() cancelDescription: string = '';
  canceledByManagerType: string = OrderHistoryEventTypeEnum.ORDER_CANCELED_BY_MANAGER;

  _updateOrderHistory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  orderHistory$!: Observable<OrderHistoryDto>;
  dateTimeFormat: string = DATE_TIME_FORMAT;

  orderHistoryEventType: typeof OrderHistoryEventTypeEnum = OrderHistoryEventTypeEnum;

  constructor(
    private readonly service: OrderHistoryService,
    private readonly route: ActivatedRoute,
    private nzImageService: NzImageService,
  ) {}

  ngOnInit(): void {
    this.orderHistory$ = this._updateOrderHistory
      .asObservable()
      .pipe(switchMap((): Observable<OrderHistoryDto> => this.service.history(this.route.snapshot.params['id'])));
  }

  onImagePreview(originalUrl?: string): void {
    if (!originalUrl) {
      return;
    }
    this.nzImageService.preview(
      [
        {
          src: originalUrl,
        },
      ],
      { nzZoom: 1, nzRotate: 0 },
    );
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../../../shared/api/auth/crud-order.service';
import { CrudRouteService } from '../../../../../../../../shared/api/auth/crud-route.service';
import { KeyPointCreateInput, KeyPointTypeEnum, OrderEntity, Pageable } from '../../../../../../../../shared/api/auth/data-contracts';
import { LogisticRouteItemService } from '../../../../../../../../shared/api/auth/logistic-route-item.service';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

@Component({
  selector: 'app-orders-to-route',
  templateUrl: 'orders-to-route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersToRouteComponent {
  @Input() routeId!: string;
  @Input() set orderIds(ids: string[]) {
    if (ids && ids.length > 0) {
      this.findOrders(ids);
    }
  }

  @Output() afterUpdate: EventEmitter<void> = new EventEmitter<void>();

  openPanel: Subject<boolean> = new Subject<boolean>();
  isLoading$: Observable<boolean> = this.crudOrderService.isLoading$;
  nzOkLoading$: Observable<boolean> = this.crudRouteService.isLoading$;

  orders: OrderEntity[] = [];

  form!: FormGroup<ToFormGroupType<Record<string, boolean>>>;

  constructor(
    private readonly crudOrderService: CrudOrderService,
    private readonly crudRouteService: CrudRouteService,
    private readonly notification: NzNotificationService,
    private readonly service: LogisticRouteItemService,
  ) {}

  findOrders($in: string[]): void {
    this.crudOrderService
      .find({
        s: JSON.stringify({
          id: { $in },
        }),
        join: ['keyPoint', 'keyPoint.route||name,code', 'store||logoUrl,name_i18n', 'orderDeliveryAddress||location'],
      })
      .pipe(
        map(({ items }: Pageable & { items?: OrderEntity[] }) => items ?? []),
        tap((orders: OrderEntity[]) => {
          this.orders = orders;
          this.openPanel.next(true);

          const controls: Record<string, FormControl<boolean | null>> = {};

          for (const order of orders) {
            controls[order.id] = new FormControl(true);
          }
          this.form = new FormGroup(controls);
        }),
      )
      .subscribe(); //todo add reload order, routs and active route
  }

  getSwitchControl(orderId: string): FormControl {
    return this.form.get(orderId) as FormControl;
  }

  onCloseModal(): void {
    this.openPanel.next(false);
  }

  onOk(): void {
    const ordersOptions: Record<string, boolean | null | undefined> = this.form.value ?? {};
    const ids: string[] = Object.keys(ordersOptions).filter((id: string) => ordersOptions[id]);
    const orders: OrderEntity[] = this.orders.filter(({ id }: OrderEntity) => ids.includes(id));

    if (ids.length > 0) {
      this.service
        .moveOrdersToRoute(this.routeId, {
          keyPoints: orders.map(
            ({ id: orderId, orderDeliveryAddress, keyPoint }: OrderEntity): KeyPointCreateInput => {
              return {
                ...(keyPoint && { id: keyPoint.id }),
                location: orderDeliveryAddress?.location ?? { lat: 0, lng: 0 },
                orderId,
                pointType: KeyPointTypeEnum.DROP_OFF,
              };
            },
          ),
        })
        .subscribe(() => {
          this.openPanel.next(false);
          this.afterUpdate.emit();
        });
    } else {
      this.notification.error('Move Orders to route', 'Please select orders or cancel.');
    }
  }
}

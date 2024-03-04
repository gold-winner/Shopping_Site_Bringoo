import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../../../shared/api/auth/crud-order.service';
import { CrudRouteService } from '../../../../../../../../shared/api/auth/crud-route.service';
import {
  KeyPointCreateInput,
  KeyPointTypeEnum,
  OrderEntity,
  RouteCreateInput,
  StaffRoleEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';
import { RoutePlanningService } from '../../../../services/route-planning.service';

type formType = ToFormGroupType<RouteCreateInput> & { orders?: FormGroup<Record<string, FormControl<boolean | null>>> };

@UntilDestroy()
@Component({
  selector: 'app-create-route-from-orders',
  templateUrl: 'create-route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRouteComponent implements OnInit {
  idsWithRoutes: Set<string> = new Set<string>();
  openPanel: Subject<boolean> = new Subject<boolean>();
  isLoading$: Observable<boolean> = this.service.isLoading$;
  form: FormGroup<formType> = new FormGroup<formType>({
    name: new FormControl(null, [Validators.required]),
    isActive: new FormControl(true, [Validators.required]),
    code: new FormControl(null, [Validators.required]),
    driverAssignedId: new FormControl(null, [Validators.required]),
    dateTimeStart: new FormControl(null, [Validators.required]),
    dateTimeEnd: new FormControl(null, [Validators.required]),
    provideComment: new FormControl(null, [Validators.max(500)]),
    orders: new FormGroup({}),
    keyPoints: new FormControl([]),
  });

  ordersError: string = '';

  dateTimeFormat: string = DATE_TIME_FORMAT;
  dateFormat: string = DATE_FORMAT;
  timeFormat: string = TIME_FORMAT;

  staffRoles: StaffRoleEnum[] = [StaffRoleEnum.PICKER_DRIVER, StaffRoleEnum.DRIVER];

  orders: OrderEntity[] = [];

  constructor(
    private readonly service: CrudOrderService,
    readonly routePlanningService: RoutePlanningService,
    private readonly crudRouteService: CrudRouteService,
  ) {}

  ngOnInit(): void {
    this.subOnCreateIds();
  }

  subOnCreateIds(): void {
    this.routePlanningService.createRouteFromOrders$
      .pipe(
        untilDestroyed(this),
        switchMap((ids: string[]) =>
          this.service.find({
            s: JSON.stringify({
              id: { $in: ids },
            }),
            join: ['keyPoint', 'keyPoint.route||name,code', 'store||logoUrl,name_i18n', 'orderDeliveryAddress||location'],
          }),
        ),
        map(({ items }: Pageable & { items?: OrderEntity[] }) => items ?? []),
        tap((orders: OrderEntity[]) => {
          this.orders = orders;
          this.openPanel.next(true);
          this.idsWithRoutes.clear();

          const controls: Record<string, FormControl<boolean | null>> = {};
          for (const order of orders) {
            if (order.keyPoint) {
              this.idsWithRoutes.add(order.id);
            }
            controls[order.id] = new FormControl(true);
          }
          this.form.reset({ isActive: true });
          this.form.removeControl('orders');
          this.form.addControl('orders', new FormGroup(controls));
        }),
      )
      .subscribe();
  }

  getSwitchControl(orderId: string): FormControl {
    return this.form.get('orders')?.get(orderId) as FormControl;
  }

  onCloseDrawer(): void {
    this.openPanel.next(false);
  }

  onCreateRoute(): void {
    const ordersOptions: Record<string, boolean | null> = this.form.get('orders')?.value ?? {};
    const ids: string[] = Object.keys(ordersOptions).filter((id: string) => ordersOptions[id]);
    const orders: OrderEntity[] = this.orders.filter(({ id }: OrderEntity) => ids.includes(id));

    if (ids.length === 0) {
      this.ordersError = 'List of orders is empty.';
    } else {
      this.ordersError = '';
      this.crudRouteService
        .create({
          ...(this.form.value as RouteCreateInput),
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
          this.routePlanningService.reloadAll();
        });
    }
  }
}

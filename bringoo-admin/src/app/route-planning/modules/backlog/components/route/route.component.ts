import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { CrudKeyPointService } from '../../../../../../shared/api/auth/crud-key-point.service';
import {
  KeyPointChangeOrderInput,
  KeyPointCreateInput,
  KeyPointDto,
  KeyPointTypeEnum,
  OrdersWithStaffInformationDto,
  RouteDetailsDto,
  RouteDto,
} from '../../../../../../shared/api/auth/data-contracts';
import { LogisticRouteService } from '../../../../../../shared/api/auth/logistic-route.service';
import { LogisticRouteItemService } from '../../../../../../shared/api/auth/logistic-route-item.service';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { DynamicFormInputs } from '../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';
import { CreateKeyPointComponent } from '../../../router-map/modules/logistic-route-details/components/create-key-point/create-key-point.component';
import { BacklogService } from '../../services/backlog.service';
import { BacklogSearchType } from '../../type/backlog-search.type';

@Component({
  selector: 'app-route',
  templateUrl: 'route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class RouteComponent implements OnInit {
  @Input() filterItems!: BacklogSearchType;

  @Input() containerId!: string;
  @Input() routeIds!: string[];
  @Input() route!: RouteDto;

  @Output() onEditRoute: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDeleteRoute: EventEmitter<string> = new EventEmitter<string>();
  @Output() completeRoute: EventEmitter<string> = new EventEmitter<string>();
  @Output() reopenRoute: EventEmitter<string> = new EventEmitter<string>();

  expanded: boolean = true;
  loadSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadItemsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  details$: Observable<RouteDetailsDto> = this.loadSubject.asObservable().pipe(
    filter(Boolean),
    switchMap(() => this.routeService.details(this.route.id)),
  );

  loadItems$: Observable<KeyPointDto[]> = this.loadItemsSubject.asObservable().pipe(
    filter(Boolean),
    tap(() => this.isLoadingSubject.next(true)),
    switchMap(() => this.routeService.points(this.route.id)),
    tap(() => {
      this.isLoadingSubject.next(false);
    }),
  );

  showAssignDriverButton$: Observable<boolean> = this.loadItems$.pipe(
    map((items: KeyPointDto[]) => {
      for (const { driver, pointType } of items) {
        if (pointType === KeyPointTypeEnum.DROP_OFF && !(driver && driver.id === this.route.driverAssigned?.id)) {
          return true;
        }
      }
      return false;
    }),
  );

  isLoadingSubject: Subject<boolean> = new Subject<boolean>();
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  updateFromOtherRoute$: Observable<boolean> = this.backlogService.updateRouteById$.pipe(map((id: string) => this.route.id === id));

  constructor(
    private readonly keyPointService: LogisticRouteItemService,
    private readonly routeService: LogisticRouteService,
    private readonly crudKeyPointService: CrudKeyPointService,
    private readonly notification: NzNotificationService,
    public readonly backlogService: BacklogService,
  ) {}

  ngOnInit(): void {
    this.reloadRoute();
    this.reloadRouteItems();
    this.updateFromOtherRoute$.subscribe((status: boolean) => {
      if (status) {
        this.reloadRoute();
        this.reloadRouteItems();
      }
    });
  }

  onLoadItems(status: boolean): void {
    this.expanded = status;
    if (status) {
      this.reloadRouteItems();
    }
  }

  onCompleteRoute(event: MouseEvent): void {
    event.stopPropagation();
    this.routeService.completeRoute(this.route.id).subscribe(() => {
      this.notification.success('Complete route', `${this.route.name} successfully complete.`);
      this.reloadRoute();
    });
  }

  onReopenRoute(event: MouseEvent): void {
    event.stopPropagation();
    this.routeService.reopenRoute(this.route.id).subscribe(() => {
      this.notification.success('Reopen route', `${this.route.name} successfully reopen.`);
      this.reloadRoute();
    });
  }

  reloadRouteItems(): void {
    if (this.expanded) {
      this.loadItemsSubject.next(true);
    }
  }

  reloadRoute(): void {
    this.loadSubject.next(true);
  }

  onEdit(): void {
    this.onEditRoute.emit(this.route.name);
  }

  onDelete(): void {
    this.onDeleteRoute.emit(this.route.name);
  }

  onAssignDriver(): void {
    this.routeService.setDriverForAllOrdersInRoute(this.route.id).subscribe(() => {
      this.notification.success('Set Driver for orders', 'Driver successfully assigned.');
      this.reloadRouteItems();
      this.reloadRoute();
    });
  }

  onRemoveKeyPoint({ id, updateOrders }: { id: string; updateOrders: boolean }): void {
    this.crudKeyPointService.delete(id).subscribe(() => {
      this.notification.success('Remove point', 'Point removed from the route');
      this.reloadRouteItems();
      if (updateOrders) {
        this.backlogService.updateOrders();
      }
    });
  }

  onFlagged({ status, id }: { status: boolean; id: string }): void {
    this.keyPointService[status ? 'flaggedRoute' : 'removeFlag'](id).subscribe(() => this.reloadRouteItems());
  }

  onUpdateQueue(items: KeyPointChangeOrderInput[]): void {
    this.keyPointService.changeOrder({ items }).subscribe(() => this.reloadRouteItems());
  }

  onDropToOtherContainer(event: CdkDragDrop<KeyPointDto[], KeyPointDto, KeyPointDto>): void {
    const routeId: string = event.container.id;
    this.keyPointService
      .movePointsToAnotherRoute({
        routeId,
        ids: [event.item.data.id],
      })
      .subscribe(() => {
        this.reloadRoute();
        this.reloadRouteItems();
        this.backlogService.updateRoute(routeId);
      });
  }

  onActionMoveToRoute({ routeId, keyPointId }: { routeId: string; keyPointId: string }): void {
    this.keyPointService.movePointsToAnotherRoute({ routeId, ids: [keyPointId] }).subscribe(() => {
      this.backlogService.updateRoute(routeId);
      this.reloadRouteItems();
    });
  }

  onDropOrderToRoute(data: OrdersWithStaffInformationDto): void {
    this.crudKeyPointService
      .create({
        orderId: data.orderId,
        routeId: this.route.id,
        pointType: KeyPointTypeEnum.DROP_OFF,
        location: data.location,
      })
      .subscribe(() => {
        this.reloadRoute();
        this.reloadRouteItems();
        this.backlogService.updateOrders();
      });
  }

  createPointDrawer: 'hide' | 'show' = 'hide';

  //create key point
  keyPointCreateForm: {
    form: Type<DynamicForm<KeyPointCreateInput>>;
    formInputs: DynamicFormInputs & { hideDropPointCreation?: boolean };
    formOutputs: DynamicFormOutputs;
    onHideDrawer: () => void;
    onSubmit: () => void;
    onShow: () => void;
  } = {
    form: CreateKeyPointComponent as Type<DynamicForm<KeyPointCreateInput>>,

    formInputs: {
      value: null,
      hideDropPointCreation: true,
    },

    formOutputs: {
      formSubmit: (value: KeyPointCreateInput): void => {
        this.crudKeyPointService
          .create({
            ...value,
            routeId: this.route.id,
          })
          .subscribe(() => {
            this.reloadRoute();
            this.reloadRouteItems();
            this.keyPointCreateForm.onHideDrawer();
          });
      },
      formValueChanges: (value: any): void => alert(value),
    } as DynamicFormOutputs,

    onHideDrawer: (): void => {
      this.createPointDrawer = 'hide';
    },
    onSubmit: (): void => {
      this.keyPointCreateForm.formInputs = { submit: Symbol('true'), show: undefined };
    },
    onShow: (): void => {
      this.createPointDrawer = 'show';
      this.keyPointCreateForm.formInputs = { show: Symbol('true'), submit: undefined, hideDropPointCreation: true };
    },
  };
}

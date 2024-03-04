import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { OrdersWithStaffInformationDto, RouteDto } from '../../../../../../../../shared/api/auth/data-contracts';
import { ContainerIdEnum } from '../../../../enum/container-id.enum';
import { LogisticOrdersService } from '../../../../services/logistic-orders.service';
import { LogisticRoutesService } from '../../../../services/logistic-routes.service';
import { RoutePlanningService } from '../../../../services/route-planning.service';

@UntilDestroy()
@Component({
  selector: 'app-orders-drop-zone',
  templateUrl: 'orders-drop-zone.component.html',
  styleUrls: ['orders-drop-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersDropZoneComponent {
  @ViewChild('cdkDropList', { static: false }) container!: CdkDropList;
  orders$: Observable<OrdersWithStaffInformationDto[]> = this.logisticOrdersService.orders$;
  isLoading$: Observable<boolean> = this.logisticOrdersService.isLoadingOrders$;

  @Input() set selectAll(input: symbol) {
    if (input) {
      this.checked = new Set<string>(this.logisticOrdersService.ordersIds);
      this.routePlanningService.showAllMarkers();
    }
  }

  @Input() set showOnMap(input: symbol) {
    if (input) {
      this.onShowMarkers();
    }
  }

  @Input() set unSelectAll(input: symbol) {
    if (input) {
      this.checked.clear();
      this.routePlanningService.hideAllMarkers();
    }
  }

  containerId: ContainerIdEnum = ContainerIdEnum.ORDERS;
  createRouteContainerId: string = 'CREATE_ROUTE';
  isDragged: boolean = false;
  isCreate: boolean = false;
  ids: string[] = [];

  connectTo: string[] = [this.createRouteContainerId];

  checked: Set<string> = new Set<string>();

  constructor(
    public readonly routePlanningService: RoutePlanningService,
    private readonly logisticOrdersService: LogisticOrdersService,
    private readonly logisticRoutesService: LogisticRoutesService,
    private readonly detectorRef: ChangeDetectorRef,
  ) {
    this.logisticRoutesService.routes$.pipe(untilDestroyed(this)).subscribe((routes: RouteDto[]) => {
      this.connectTo = [this.createRouteContainerId, ...routes.map(({ id }: RouteDto) => id)];
      this.detectorRef.markForCheck();
    });
  }

  changeShowStatus(status: boolean, id: string): void {
    this.checked[status ? 'add' : 'delete'](id);
    this.routePlanningService.changeShowStatus({ status, id });
  }

  onDragStart(id: string): void {
    this.ids = this.checked.has(id) ? [...this.checked.values()] : [id];
    this.isDragged = true;
  }

  onDragEnd(): void {
    this.isDragged = false;
  }

  onDropEvent(event: CdkDragDrop<any>): void {
    if (event.container.id === this.createRouteContainerId && event.previousContainer.id === this.containerId) {
      this.onCreate();
    }
  }

  onCreate(): void {
    this.routePlanningService.createRouteFromOrder(this.ids);
    this.isCreate = false;
  }

  onShowMarkers(): void {
    const markers: google.maps.Marker[] = [];

    for (const [index, order] of this.logisticOrdersService.orders.entries()) {
      const color: 'yellow' | 'blue' | 'red' | 'green' = this.markerColor({
        picker: order.picker,
        driver: order.driver,
      });

      const orderMarker: google.maps.Marker = new google.maps.Marker({
        title: order.orderNumber,
        position: order.location,
        clickable: true,
        icon: {
          url: `../../../../../../assets/img/map-markers/${color}-marker.svg`,
          anchor: new google.maps.Point(26, 45.5),
          scaledSize: new google.maps.Size(52, 58.5),
        },
        label: {
          text: `${index + 1}`,
          className: 'map-label',
        },
      });

      orderMarker.set('id', order.orderId);
      orderMarker.set('order', order);
      orderMarker.set('index', index);
      if (!this.checked.has(order.orderId)) {
        orderMarker.setVisible(false);
      }

      markers.push(orderMarker);
    }
    this.routePlanningService.setMarkers(markers, 'ORDERS');
  }

  markerColor({ picker, driver }: Pick<OrdersWithStaffInformationDto, 'driver' | 'picker'>): 'yellow' | 'blue' | 'red' | 'green' {
    if (!picker && !driver) {
      return 'red';
    }
    if (!picker && driver) {
      return 'blue';
    }
    if (picker && !driver) {
      return 'yellow';
    }
    return 'green';
  }
}

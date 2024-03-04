import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import {
  KeyPointChangeOrderInput,
  RouteChangeOrderInput,
  RouteDto,
  RouteEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { LogisticRouteItemService } from '../../../../../../../../shared/api/auth/logistic-route-item.service';
import { arrayMove } from '../../../../../../../../shared/helpers/move-in-array.helper';
import { ContainerIdEnum } from '../../../../enum/container-id.enum';
import { LogisticRoutesService } from '../../../../services/logistic-routes.service';
import { RoutePlanningService } from '../../../../services/route-planning.service';

@Component({
  selector: 'app-routes-drop-zone',
  templateUrl: 'routes-drop-zone.component.html',
  styleUrls: ['routes-drop-zone.component.scss'],
  host: { class: 'd-block h-100p' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesDropZoneComponent {
  routes$: Observable<RouteDto[]> = this.logisticRoutesService.routes$;
  isLoading$: Observable<boolean> = this.logisticRoutesService.isLoadingRoutes$;

  @Output() onManyCheck: EventEmitter<boolean> = new EventEmitter<boolean>();
  deleteId?: string;

  @Input() set deleteMany(k: symbol | null) {
    if (k) {
      this.onShowDeleteModal();
    }
  }

  containerId: string = ContainerIdEnum.ROUTES;
  showModal: 'close' | 'remove route' | 'change route for kp' = 'close';

  keyPointsToRoutDropEvent: CdkDragDrop<Set<string> | string> | null = null;
  keyPointsCount: number = 0;
  keyPointsIds: string[] = [];

  dropOrderIds: string[] = [];
  routeId: string = '';

  checkedKeyPoints: Set<string> = new Set<string>();

  activeRoute$ = this.logisticRoutesService.activeRoute$;

  constructor(
    public readonly routePlanningService: RoutePlanningService,
    private readonly logisticRoutesService: LogisticRoutesService,
    private readonly detectorRef: ChangeDetectorRef,
    private readonly keyPointService: LogisticRouteItemService,
  ) {}

  onShowRouteDetails(id: string): void {
    this.logisticRoutesService.setActiveRoute(id);
  }

  onKeyPointDropToRoute(drop: CdkDragDrop<Set<string> | string>, routeId: string): void {
    if (this.logisticRoutesService.activeRouteId === routeId) return;

    this.showModal = 'change route for kp';
    this.keyPointsToRoutDropEvent = drop;
    this.routeId = routeId;

    if (drop.item.data instanceof Set) {
      this.keyPointsCount = drop.item.data.size;
      this.keyPointsIds = [...drop.item.data.values()];
      drop.item.data.clear();
    } else {
      this.keyPointsCount = 1;
      this.keyPointsIds = [drop.item.data];
    }
  }

  onCloseModal(): void {
    this.showModal = 'close';
    this.keyPointsToRoutDropEvent = null;
  }

  changeRouteForKeyPoints(): void {
    if (this.keyPointsToRoutDropEvent === null) return;

    this.detectorRef.detectChanges();

    this.keyPointService.movePointsToAnotherRoute({ routeId: this.routeId, ids: this.keyPointsIds }).subscribe(
      () => {
        this.routePlanningService.reloadAll();
        this.onCloseModal();
      },
      () => {
        this.onCloseModal();
      },
    );
  }

  onChangeOrder(event: CdkDragDrop<RouteEntity[]>): void {
    if (event.currentIndex === event.previousIndex) return;

    const sortedIds: string[] = arrayMove(this.logisticRoutesService.routeIds, event.previousIndex, event.currentIndex);
    const queue: number[] = this.logisticRoutesService.routeQueue;

    const input: RouteChangeOrderInput = {
      items: sortedIds.map(
        (id: string, index: number): KeyPointChangeOrderInput => ({
          id,
          queue: queue[index],
        }),
      ),
    };

    this.logisticRoutesService.changeRoutesQueue(input);
  }

  onOrdersDropToRoute(event: CdkDragDrop<Set<string> | string>, routeId: string): void {
    this.dropOrderIds = typeof event.item.data === 'string' ? [event.item.data] : [...event.item.data.values()];
    this.routeId = routeId;
    this.detectorRef.detectChanges();
  }

  onKeyPointCheck(status: boolean, id: string): void {
    this.checkedKeyPoints[status ? 'add' : 'delete'](id);
    this.onManyCheck.next(this.checkedKeyPoints.size > 0);
  }

  onOrdersAreMovedToRoute(): void {
    this.routePlanningService.reloadAll();
  }

  onShowDeleteModal(id?: string): void {
    this.showModal = 'remove route';
    this.deleteId = id;
  }

  onDelete(): void {
    if (this.deleteId) {
      this.onDeleteOne(this.deleteId);
    } else if (this.checkedKeyPoints.size > 0) {
      this.onDeleteMany([...this.checkedKeyPoints.values()]);
    }
  }

  onDeleteOne(id: string): void {
    this.logisticRoutesService.deleteOneRoute(id).subscribe(() => {
      this.onCloseModal();
    });
  }

  onDeleteMany(ids: string[]): void {
    this.logisticRoutesService.deleteManyRoutes(ids).subscribe(() => {
      this.onCloseModal();
    });
  }
}

import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CrudRouteService } from '../../../../../../shared/api/auth/crud-route.service';
import {
  KeyPointChangeOrderInput,
  KeyPointDto,
  OrdersWithStaffInformationDto,
  RouteEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { arrayMove } from '../../../../../../shared/helpers/move-in-array.helper';
import { Pageable } from '../../../../../../shared/interfaces/pageable';
import { BacklogContainersEnum } from '../../enums/backlog-containers.enum';
import { BacklogSearchType } from '../../type/backlog-search.type';

@Component({
  selector: 'app-route-key-point-list',
  templateUrl: 'route-key-point-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class RouteKeyPointListComponent {
  @Input() filterItems!: BacklogSearchType;

  noAvatar: string = 'assets/img/avatars/noAvatar.svg';
  @Input() items!: KeyPointDto[];
  @Input() isLoading!: Observable<boolean>;

  @Input() containerId!: string;
  @Input() connectToContainers!: string[];

  @Output() updateQueue: EventEmitter<KeyPointChangeOrderInput[]> = new EventEmitter<KeyPointChangeOrderInput[]>();
  @Output() dropToOtherContainer: EventEmitter<CdkDragDrop<KeyPointDto[], KeyPointDto, KeyPointDto>> = new EventEmitter<
    CdkDragDrop<KeyPointDto[], KeyPointDto, KeyPointDto>
  >();

  @Output() onRemove: EventEmitter<{ id: string; updateOrders: boolean }> = new EventEmitter<{ id: string; updateOrders: boolean }>();
  @Output() onFlagged: EventEmitter<{ status: boolean; id: string }> = new EventEmitter();
  @Output() dropFromOtherRoute: EventEmitter<void> = new EventEmitter<void>();
  @Output() onActionMoveToRoute: EventEmitter<{ routeId: string; keyPointId: string }> = new EventEmitter<{
    routeId: string;
    keyPointId: string;
  }>();

  @Output() onDropOrderToRoute: EventEmitter<OrdersWithStaffInformationDto> = new EventEmitter<OrdersWithStaffInformationDto>();

  @Input() routes$: Observable<RouteEntity[]> = this.crudRouteService
    .find({
      s: JSON.stringify({
        isComplete: false,
      }),
      fields: 'id,name,code',
      sort: ['queue,ASC'],
    })
    .pipe(map(({ items }: Pageable & { items?: RouteEntity[] }) => (items ? items : [])));

  constructor(private readonly crudRouteService: CrudRouteService) {}

  onDropped(event: CdkDragDrop<KeyPointDto[], KeyPointDto, KeyPointDto>): void {
    if (event.container.id === event.previousContainer.id) {
      this.updateQueue.emit(this.changeOrderInput(this.items, event.previousIndex, event.currentIndex));
      return;
    }
    if (event.previousContainer.id === BacklogContainersEnum.orders) {
      this.dropOrderToRoute(event as CdkDragDrop<any>);
    }
  }

  dropOrderToRoute(
    event: CdkDragDrop<OrdersWithStaffInformationDto[], OrdersWithStaffInformationDto, OrdersWithStaffInformationDto>,
  ): void {
    this.onDropOrderToRoute.emit(event.item.data);
  }

  changeFlagStatus(prevStatus: boolean, id: string): void {
    this.onFlagged.emit({
      status: !prevStatus,
      id,
    });
  }

  moveTo(index: number, to: 'top' | 'bottom'): void {
    const ids: KeyPointChangeOrderInput[] = this.changeOrderInput(this.items, index, to === 'top' ? 0 : this.items.length - 1);
    this.updateQueue.emit(ids);
  }

  onDroppedItem(event: CdkDragDrop<KeyPointDto[], KeyPointDto, KeyPointDto>): void {
    if (event.container.id === event.previousContainer.id) return;
    const queues: number[] = event.container.data.map(({ queue }: KeyPointDto) => queue);
    queues.push(event.item.data.queue);
    queues.sort((a: number, b: number) => a - b);

    const data: KeyPointChangeOrderInput[] = arrayMove(
      [...event.container.data, event.item.data],
      event.container.data.length,
      event.currentIndex,
    ).map(
      ({ id }: KeyPointDto, index: number): KeyPointChangeOrderInput => ({
        id,
        queue: queues[index],
      }),
    );
    this.updateQueue.emit(data);
    this.dropToOtherContainer.emit(event);
  }

  changeOrderInput(items: KeyPointDto[], from: number, to: number): KeyPointChangeOrderInput[] {
    return arrayMove(items, from, to).map(
      ({ id }: KeyPointDto, index: number): KeyPointChangeOrderInput => ({
        id,
        queue: items[index].queue,
      }),
    );
  }

  moveToRoute(routeId: string, keyPointId: string): void {
    this.onActionMoveToRoute.emit({ routeId, keyPointId });
  }

  removePoint({ id, order }: KeyPointDto): void {
    const date: string = order ? order?.deliveryDateTime?.split(' ')[0] : '';

    this.onRemove.emit({
      id,
      updateOrders: Boolean(date && date === format(new Date(), DATE_FORMAT)),
    });
  }

  sortPredicate(index: number, drag: CdkDrag): boolean {
    return drag.dropContainer.id !== BacklogContainersEnum.orders;
  }
}

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { KeyPointTypeEnum, RouteDetailsDto } from '../../../../../../shared/api/auth/data-contracts';
import { DropCreateRouteType } from '../../type/drop-create-route.type';

@Component({
  selector: 'app-create-key-points-list',
  templateUrl: 'create-key-points-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class CreateKeyPointsListComponent {
  @Input() containerId!: string;
  @Input() connectTo!: string[];
  @Input() list!: DropCreateRouteType[];
  @Input() isLading$!: Observable<boolean>;
  @Output() onRemoveFromRoute: EventEmitter<{ index: number; orderId?: string; pointType: KeyPointTypeEnum }> = new EventEmitter<{
    index: number;
    orderId?: string;
    pointType: KeyPointTypeEnum;
  }>();

  @Output() onListDropped: EventEmitter<CdkDragDrop<DropCreateRouteType[], DropCreateRouteType, DropCreateRouteType>> = new EventEmitter();

  @Output() totals: EventEmitter<Omit<RouteDetailsDto, 'id' | 'driver' | 'code' | 'name'>> = new EventEmitter();

  listDropped(event: CdkDragDrop<DropCreateRouteType[], DropCreateRouteType, DropCreateRouteType>): void {
    this.onListDropped.emit(event);
  }

  removeFormRouteAction(index: number, item: DropCreateRouteType): void {
    if ('orderStatus' in item) {
      this.onRemoveFromRoute.emit({
        orderId: item.orderId,
        index,
        pointType: KeyPointTypeEnum.DROP_OFF,
      });
      return;
    }
    this.onRemoveFromRoute.emit({
      index,
      pointType: item.pointType,
    });
  }

  dragDropped(e: CdkDragDrop<DropCreateRouteType>): void {
    if (e.previousContainer.id === e.container.id) return;

    if (e.previousContainer.id === this.containerId) {
      this.list.splice(e.previousIndex, 1);
    }
  }
}

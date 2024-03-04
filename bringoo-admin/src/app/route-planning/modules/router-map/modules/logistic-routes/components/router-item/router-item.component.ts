import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { RouteDto, RouteEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { ContainerIdEnum } from '../../../../enum/container-id.enum';

@Component({
  selector: 'app-router-item',
  templateUrl: 'router-item.component.html',
  host: { 'class': 'd-block bg-component', '[class.isDropOver]': 'isDropOver' },
  styleUrls: ['../../../../shared-styles/side-bar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterItemComponent {
  @Input() route!: RouteDto;
  @Input() isActive!: boolean;
  @Input() index!: number;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() dropKeyPoint: EventEmitter<CdkDragDrop<Set<string> | string>> = new EventEmitter<CdkDragDrop<Set<string> | string>>();
  @Output() dropOrder: EventEmitter<CdkDragDrop<Set<string> | string>> = new EventEmitter<CdkDragDrop<Set<string> | string>>();

  isDropOver: boolean = false;

  dateTimeFormat: string = DATE_TIME_FORMAT;
  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.route.id);
  }

  onEntered(): void {
    this.isDropOver = true;
  }

  onExit(): void {
    this.isDropOver = false;
  }

  onDrop(event: CdkDragDrop<RouteEntity[] | (Set<string> | string)>): void {
    this.isDropOver = false;

    switch (event.previousContainer.id) {
      case ContainerIdEnum.KEY_POINTS: {
        this.dropKeyPoint.emit(event as CdkDragDrop<Set<string> | string>);
        break;
      }
      case ContainerIdEnum.ORDERS: {
        this.dropOrder.emit(event as CdkDragDrop<Set<string> | string>);
        break;
      }
    }
  }
}

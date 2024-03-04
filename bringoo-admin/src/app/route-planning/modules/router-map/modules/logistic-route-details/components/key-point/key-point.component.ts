import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { KeyPointDto } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';

@Component({
  selector: 'app-key-point',
  templateUrl: 'key-point.component.html',
  styleUrls: ['../../../../shared-styles/side-bar-item.component.scss'],
  host: { class: 'd-block px-4 pb-2 pt-2 bg-component' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyPointComponent {
  @Input() keyPoint!: KeyPointDto;
  @Input() index: number | null = null;
  @Output() updateId: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>();

  dateTimeFormat: string = DATE_TIME_FORMAT;

  onUpdate(event: MouseEvent): void {
    event.stopPropagation();
    this.updateId.emit(this.keyPoint.id);
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteId.emit(this.keyPoint.id);
  }
}

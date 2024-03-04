import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { KeyPointDto } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';

@Component({
  selector: 'app-key-point-info',
  templateUrl: 'key-point-info-window.component.html',
  styleUrls: ['key-point-info-window.component.scss'],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyPointInfoWindowComponent {
  dateTimeFormat: string = DATE_TIME_FORMAT;
  @Input() keyPoint!: KeyPointDto;
  @Input() index!: number;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
}

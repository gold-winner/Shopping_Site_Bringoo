import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StoreEntity } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-store-info-window',
  templateUrl: 'store-info-window.component.html',
  styleUrls: ['../key-point-info-window/key-point-info-window.component.scss'],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreInfoWindowComponent {
  @Input() store!: StoreEntity;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
}

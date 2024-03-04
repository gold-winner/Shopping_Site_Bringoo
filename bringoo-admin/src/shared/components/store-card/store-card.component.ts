import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StoreEntity } from '../../api/auth/data-contracts';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCardComponent {
  @Input() label: string = 'Store details';
  @Input() isEdited: boolean = false;
  @Input() placeHolder: string = '';
  @Output() edit: EventEmitter<StoreEntity> = new EventEmitter<StoreEntity>();
  @Input() store: StoreEntity | null | undefined;

  onEdit(): void {
    this.edit.emit();
  }
}

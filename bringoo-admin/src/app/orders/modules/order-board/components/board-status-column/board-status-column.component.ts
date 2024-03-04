import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderEntity, Pageable } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-board-status-column',
  templateUrl: 'board-status-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardStatusColumnComponent {
  @Input() observer!: Observable<Pageable & { items?: OrderEntity[] }>;
  @Input() statusType: string = '';
}

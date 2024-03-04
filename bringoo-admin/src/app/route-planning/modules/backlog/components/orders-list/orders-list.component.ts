import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { OrdersWithStaffInformationDto } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-orders-list',
  templateUrl: 'orders-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class OrdersListComponent {
  @Input() containerId!: string;
  @Input() connectTo!: string[];
  @Input() list!: OrdersWithStaffInformationDto[];
  @Input() isLoading$!: Observable<boolean>;
  @Input() listType: 'orders' | 'route-items' = 'orders';
}

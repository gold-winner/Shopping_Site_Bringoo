import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { OrdersWithStaffInformationDto } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-order-info',
  templateUrl: 'order-info-window.component.html',
  styleUrls: ['../key-point-info-window/key-point-info-window.component.scss'],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInfoWindowComponent {
  @Input() order!: OrdersWithStaffInformationDto;
  @Input() index!: number;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { OrdersWithStaffInformationDto } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';

@Component({
  selector: 'app-order-item',
  templateUrl: 'order-item.component.html',
  styleUrls: ['../../../../shared-styles/side-bar-item.component.scss'],
  host: { class: 'd-block px-4 pb-2 pt-2 px-4 bg-component' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent {
  @Input() order!: OrdersWithStaffInformationDto;
  @Input() index!: number;

  dateTimeFormat: string = DATE_TIME_FORMAT;
}

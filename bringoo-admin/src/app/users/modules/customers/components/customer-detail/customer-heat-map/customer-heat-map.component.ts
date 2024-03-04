import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { add, format } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnalyticsCustomersService } from '../../../../../../../shared/api/auth/analytics-customers.service';
import { DATE_FORMAT } from '../../../../../../../shared/config/constants.config';
import { OrdersHeatMapToCalendar } from '../../../../../../../shared/helpers/orders-heat-map-to-calendar';
import { CalendarDataType } from '../../../../../../../shared/types/calendar-data.type';

@Component({
  selector: 'app-customer-heat-map',
  templateUrl: './customer-heat-map.component.html',
  styleUrls: ['customer-heat-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class CustomerHeatMapComponent implements OnInit {
  @Input() customerId!: string;
  isLoading$: Observable<boolean> = this.service.isLoading$;

  dateEnd: string = format(new Date(), DATE_FORMAT);
  dateStart: string = format(add(new Date(), { years: -1 }), DATE_FORMAT);

  ordersHistory$!: Observable<{ data: CalendarDataType[]; count: number }>;

  constructor(private readonly service: AnalyticsCustomersService) {}

  ngOnInit(): void {
    this.ordersHistory$ = this.service
      .customerOrdersHeatMap(this.customerId, { dateEnd: this.dateEnd, dateStart: this.dateStart })
      .pipe(map(OrdersHeatMapToCalendar));
  }
}

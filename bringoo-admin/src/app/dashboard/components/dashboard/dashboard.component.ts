import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { add, format } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { AdminService } from '../../../../shared/api/auth/admin.service';
import { CrudOrderService } from '../../../../shared/api/auth/crud-order.service';
import {
  DashboardDto,
  ManagerProfileDto,
  OrderEntity,
  OrderForecastDto,
  OrdersByHoursDto,
} from '../../../../shared/api/auth/data-contracts';
import { ManagerProfileService } from '../../../../shared/api/auth/manager-profile.service';
import { OrdersFilterFormComponent } from '../../../../shared/components/orders-filter-form/orders-filter-form.component';
import { DATE_FORMAT } from '../../../../shared/config/constants.config';
import { ORDER_TABLE_FIELDS, ORDERS_TABLE_COLUMNS, ORDERS_TABLE_JOIN } from '../../../../shared/config/orders-table.config';
import { BarChartValuesToDataAndLabels } from '../../../../shared/helpers/bar-chart-values-to-data-and-labels';
import { DynamicFilterFormComponent } from '../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn } from '../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../shared/modules/crud/types/crud-select.type';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { PushNotificationService } from '../../../push-notification/services';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  fields: CrudFields<OrderEntity> = ORDER_TABLE_FIELDS;
  join: string[] = ORDERS_TABLE_JOIN;

  dateStart: string = format(new Date(), DATE_FORMAT);
  dateEnd: string = format(add(new Date(), { days: 1 }), DATE_FORMAT);

  userLoad!: ManagerProfileDto;
  user$: Observable<ManagerProfileDto | null> = this.authenticationService.userId$.pipe(
    filter(Boolean),
    switchMap((): Observable<ManagerProfileDto> => this.managerProfileService.profileGet()),
    tap((user: ManagerProfileDto | null) => user && (this.userLoad = user)),
  );

  dashBoard$: Observable<DashboardDto> = this.adminService.dashboard();
  orderForecast$: Observable<OrderForecastDto> = this.adminService.orderForecast();
  orderByHours$: Observable<OrdersByHoursDto> = this.adminService.orderByHours();

  unreadNotifications$: BehaviorSubject<string[]>;

  filterForm: Type<DynamicFilterFormComponent> = OrdersFilterFormComponent;

  config: CrudConfig = {
    title: 'List of Orders of today',
    plural: 'List of Orders of today',
    single: 'List of Orders of today',
    isActionColumnVisible: false,
    nzScrollX: '2000px',
  };

  columns: CrudColumn<OrderEntity>[] = [...ORDERS_TABLE_COLUMNS];

  constructor(
    public readonly service: CrudOrderService,
    private readonly managerProfileService: ManagerProfileService,
    private readonly authenticationService: AuthenticationService,
    private readonly adminService: AdminService,
    private readonly pushNotificationService: PushNotificationService,
  ) {
    this.unreadNotifications$ = this.pushNotificationService.notReadedNotifications$;
  }

  formatter = BarChartValuesToDataAndLabels;

  onLogOut(): void {
    this.authenticationService.signOut();
  }
}

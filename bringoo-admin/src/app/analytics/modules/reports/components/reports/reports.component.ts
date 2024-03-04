import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { OrderEntity } from '../../../../../../shared/api/auth/data-contracts';
import { getDayMonthAgo } from '../../../../../../shared/helpers/day-month-ago';
import { Pageable } from '../../../../../../shared/interfaces/pageable';
import { ACQUISITION } from '../../configs/acquisition-reports.config';
import { BEHAVIOR } from '../../configs/behavior-reports.config';
import { CUSTOMERS } from '../../configs/customers-reports.config';
import { FINANCES } from '../../configs/finances-reports.config';
import { INVENTORY } from '../../configs/inventory-reports.config';
import { MARKETING } from '../../configs/marketing-reports.config';
import { PROFIT } from '../../configs/profit-reports.config';
import { SALES } from '../../configs/sales-reports.config';
import { reportSection } from '../../types/report-filter';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  search!: string;
  orders$!: Observable<Pageable & { items?: OrderEntity[] }>;

  sales: reportSection[] = SALES;
  profit: reportSection[] = PROFIT;
  behavior: reportSection[] = BEHAVIOR;
  marketing: reportSection[] = MARKETING;
  customers: reportSection[] = CUSTOMERS;
  finances: reportSection[] = FINANCES;
  inventory: reportSection[] = INVENTORY;
  acquisition: reportSection[] = ACQUISITION;

  constructor(private crudOrderService: CrudOrderService) {
    this.getOrders();
  }

  getOrders(): void {
    this.search = JSON.stringify({
      create_date: {
        $gte: getDayMonthAgo(new Date()).toISOString(),
      },
    });
    this.orders$ = this.crudOrderService.find({ s: this.search, limit: 1 });
  }
}

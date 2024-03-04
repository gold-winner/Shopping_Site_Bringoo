import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { CrudOrderManagerMessageService } from '../../../../../../../../shared/api/auth/crud-order-manager-message.service';
import {
  FindInput,
  OrderManagerMessageCreateInput,
  OrderManagerMessageEntity,
  Pageable,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { isNonNull } from '../../../../../../../../shared/helpers/is-non-null.helper';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { AuthenticationService } from '../../../../../../../../shared/services/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-manager-messages',
  templateUrl: 'manager-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class ManagerMessagesComponent implements OnInit {
  @Input() orderId: string = '';
  @Input() tz: string = 'UTC';
  @Input() set storeTZ(tz: string | undefined) {
    if (tz) {
      this.tz = tz;
    }
  }

  defaultValues: Partial<OrderManagerMessageCreateInput> = {
    message: '',
    isHideForStaff: false,
    isActive: true,
  };

  dateTimeFormat: string = DATE_TIME_FORMAT;

  currentPage!: Observable<Pageable & { items: OrderManagerMessageEntity[] }>;

  findInput!: BehaviorSubject<FindInput>;
  managerId: string = '';

  page: number = 1;
  total: number = 1;
  count: number = 1;

  constructor(
    private readonly orderManagerMessages: CrudOrderManagerMessageService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.findInput = new BehaviorSubject<FindInput>({
      limit: 10,
      page: 1,
      filter: [['orderId', CondOperator.EQUALS, this.orderId].join('||')],
      join: ['manager', 'manager.settings'],
      sort: ['create_date,DESC'],
    });

    this.currentPage = this.findInput.asObservable().pipe(
      switchMap((page: FindInput) => this.orderManagerMessages.find({ ...page })),
      tap((page: Pageable & { items?: OrderManagerMessageEntity[] }) => {
        this.page = page.page;
        this.total = page.total;
        this.count = page.count;
      }),
      map((page: Pageable & { items?: OrderManagerMessageEntity[] }) => ({
        ...page,
        items: page.items ?? [],
      })),
    );

    this.authenticationService.userId$
      .pipe(untilDestroyed(this), filter(isNonNull))
      .subscribe((managerId: string) => (this.managerId = managerId));
  }

  onReloadMessages(): void {
    this.findInput.next({
      ...this.findInput.getValue(),
    });
  }

  onChangePage(index: number): void {
    this.findInput.next({
      ...this.findInput.getValue(),
      page: index,
    });
  }
}

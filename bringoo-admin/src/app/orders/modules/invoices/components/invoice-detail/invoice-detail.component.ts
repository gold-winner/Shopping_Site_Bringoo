import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromUnixTime } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, take, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { OrderDetailsDto, OrderEntity, SendInvoiceDto } from '../../../../../../shared/api/auth/data-contracts';
import { InvoiceService } from '../../../../../../shared/api/auth/invoice.service';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['invoice-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class InvoiceDetailComponent implements OnInit {
  IBAN: string = 'DE 56 2005 0550 1500 6983 43';
  orderDetails$!: Observable<OrderDetailsDto>;
  order$!: Observable<OrderEntity>;
  dateTimeFormat: string = DATE_TIME_FORMAT;
  dateFormat: string = DATE_FORMAT;
  invoiceUrl: string | undefined = undefined;
  private invoiceGeneratingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isInvoiceGenerating$: Observable<boolean> = this.invoiceGeneratingSubject.asObservable();

  constructor(
    private readonly crudOrderService: CrudOrderService,
    private readonly invoiceService: InvoiceService,
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private breadcrumbs: BreadCrumbService,
  ) {}

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    const orderId: string = this.route.snapshot.params['id'];
    this.orderDetails$ = this.crudOrderService.details(orderId).pipe(
      take(1),
      untilDestroyed(this),
      tap((order: OrderDetailsDto) => {
        this.setBreadcrumbs(order.orderNumber ?? '');
        this.invoiceUrl = order.invoiceUrl;
      }),
    );
    this.order$ = this.crudOrderService.findOne(orderId, {
      fields: 'deliveryVatRate,deliveryVatAmount',
    });
  }

  onSendInvoice(orderId: string): void {
    this.invoiceGeneratingSubject.next(true);
    this.invoiceService
      .sendInvoice({ orderId })
      .pipe(
        take(1),
        untilDestroyed(this),
        tap(({ invoiceUrl }: SendInvoiceDto) => {
          this.invoiceUrl = invoiceUrl || undefined;
        }),
        finalize(() => this.invoiceGeneratingSubject.next(false)),
      )
      .subscribe();
  }

  onDownloadInvoice(orderId: string): void {
    this.invoiceGeneratingSubject.next(true);
    this.invoiceService
      .downloadInvoice({ orderId })
      .pipe(
        take(1),
        untilDestroyed(this),
        map(({ invoiceUrl }: SendInvoiceDto) => invoiceUrl),
        tap((invoiceUrl: string) => {
          this.invoiceUrl = invoiceUrl || undefined;
        }),
        finalize(() => this.invoiceGeneratingSubject.next(false)),
      )
      .subscribe((invoiceUrl: string) => {
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = invoiceUrl;
        a.click();
        a.remove();
      });
  }

  fromUnixTime: (utc: number) => Date = (utc: number) => fromUnixTime(utc);

  setBreadcrumbs(invoiceNumber: string): void {
    this.breadcrumbs.resetBreadCrumbs([
      {
        path: './orders/invoices',
        title: 'Invoices',
      },
      {
        path: `./orders/invoices/${this.route.snapshot.params['id']}`,
        title: invoiceNumber,
      },
    ]);
  }
}

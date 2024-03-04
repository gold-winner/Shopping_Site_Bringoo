import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppManagerAccountingService } from '../../../../../../shared/api/auth/app-manager-accounting.service';
import { OrderAccountingInvoiceDto } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-order-accounting',
  templateUrl: './order-accounting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderAccountingComponent implements OnInit {
  @Input() orderId: string = '';
  invoices$: BehaviorSubject<OrderAccountingInvoiceDto[]> = new BehaviorSubject<OrderAccountingInvoiceDto[]>([]);
  canCreateInvoice$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoading$: Observable<boolean> = this.appManagerAccountingService.isLoading$;

  draftInvoice$: Observable<OrderAccountingInvoiceDto | null> = this.invoices$.pipe(
    map((invoices: OrderAccountingInvoiceDto[]) => {
      if (invoices) {
        return invoices.find(({ isFinalized }: OrderAccountingInvoiceDto) => !isFinalized) || null;
      }

      return null;
    }),
  );

  finalizedInvoice$: Observable<OrderAccountingInvoiceDto | null> = this.invoices$.pipe(
    map((invoices: OrderAccountingInvoiceDto[]) => {
      if (invoices) {
        return invoices.find(({ isFinalized }: OrderAccountingInvoiceDto) => !!isFinalized) || null;
      }

      return null;
    }),
  );

  constructor(private readonly appManagerAccountingService: AppManagerAccountingService) {}

  ngOnInit(): void {
    this.loadOrderInvoices();
  }

  submitInvoice(isFinalized: boolean): void {
    this.appManagerAccountingService.submitInvoicesFromOrder({ orderId: this.orderId, isFinalized }).subscribe(() => {
      this.loadOrderInvoices();
    });
  }

  loadOrderInvoices(): void {
    this.appManagerAccountingService.getInvoicesByOrderId(this.orderId).subscribe((invoices: OrderAccountingInvoiceDto[]) => {
      this.invoices$.next(invoices);
    });
  }
}

import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { TotalVatDto } from 'src/shared/api/data-contracts';
@Component({
  selector: 'ui-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
})
export class TotalComponent {
  @Input() hasVoucher: boolean = false;
  @Input() hasBackground: boolean = true;
  @Input() subTotal: string = '';
  @Input() totalDeposit: string = '';
  @Input() vatTotal: TotalVatDto[] = [];
  @Input() totalPrice: string = '';
  @Input() deliveryFee: string | undefined;
  @Output() onAddVoucherClick = new EventEmitter<Event>();

  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalPrice) {
      if (this.totalPrice !== '') {
        this.ref.detectChanges();
      }
    }
  }
}

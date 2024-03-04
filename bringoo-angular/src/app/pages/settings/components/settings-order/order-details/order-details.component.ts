import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-settings-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class SettingsOrderDetailsComponent {
  @Input() id: string = '';
  @Output() onProductsSelect = new EventEmitter<string>();
  @Output() onOrderStatusClick = new EventEmitter<string>();

  voucherModal: boolean = false;

  onAddVoucherClick(): void {
    this.voucherModal = true;
  }

  onVoucherModalClose(): void {
    this.voucherModal = false;
  }
}

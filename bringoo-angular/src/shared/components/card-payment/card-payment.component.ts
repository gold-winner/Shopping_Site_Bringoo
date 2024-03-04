import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PaymentMethodEntity } from '../../../app/example/components/cards/cards.mock';
@Component({
  selector: 'ui-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent {
  @Input() paymentMethod!: PaymentMethodEntity;
  @Input() small: boolean = false;
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CustomerAddressDto } from '../../api/data-contracts';
@Component({
  selector: 'ui-card-address',
  templateUrl: './card-address.component.html',
  styleUrls: ['./card-address.component.scss'],
})
export class CardAddressComponent {
  @Input() address!: CustomerAddressDto;
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<CustomerAddressDto>();
  @Output() onDelete = new EventEmitter<any>();

  onDeleteAddress(id: string, zip: string): void {
    const data: any = {
      id: id,
      zip: zip,
    };
    this.onDelete.emit(data);
  }

  onEditAddress(address: CustomerAddressDto): void {
    this.onEdit.emit(address);
  }
}

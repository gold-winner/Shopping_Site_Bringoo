import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductLinkDetailsDto } from 'src/shared/api/data-contracts';

import { IOption } from '../../../../../../shared/components/option';

@Component({
  selector: 'ui-settings-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss'],
})
export class SettingsOrderProductsComponent implements OnInit {
  @Output() backToDetails = new EventEmitter<Event>();

  selectedOption: string = 'all';
  options: IOption[] = [];
  products: ProductLinkDetailsDto[] = [];

  onChangeOption(option: string): void {
    this.selectedOption = option;
  }

  ngOnInit(): void {
    this.options = [
      {
        id: 'all',
        label: 'All',
      },
      {
        id: 'pending',
        label: 'Pending',
      },
      {
        id: 'closed',
        label: 'Closed',
      },
      {
        id: 'cancelled',
        label: 'Cancelled',
      },
    ];

    this.products = [];
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductLinkDetailsDto } from 'src/shared/api/data-contracts';

import { IOption } from '../../../../../../shared/components/option';

@Component({
  selector: 'ui-settings-history-products',
  templateUrl: './history-products.component.html',
  styleUrls: ['./history-products.component.scss'],
})
export class SettingsHistoryProductsComponent implements OnInit {
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

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  searchName: string = '';
  @Output() onSearchClick = new EventEmitter<string>();

  onEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.onSearchClick.emit(this.searchName);
    }
  }
}

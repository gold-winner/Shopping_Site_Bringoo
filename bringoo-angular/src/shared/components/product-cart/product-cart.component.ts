import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { CartInfoDto, ProductDto, ProductInput } from '../../api/data-contracts';
@Component({
  selector: 'ui-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent {
  @Input() sidebar: boolean = false;
  @Input() product!: ProductDto;
  @Input() linkId: string = '';
  @Output() onCartInfo = new EventEmitter<ProductInput>();
  checked: boolean = false;
  cartData: CartInfoDto | undefined;
  deleteItemModal: boolean = false;
  loading: boolean = false;

  constructor(private ref: ChangeDetectorRef) {}

  changeCart(data: ProductInput): void {
    this.onCartInfo.emit(data);
  }

  onDelete(linkId: string): void {
    this.linkId = linkId;
    this.deleteItemModal = true;
  }

  onDeleteItem(): void {
    this.loading = true;
    const data: ProductInput = {
      linkId: this.linkId,
      count: 0,
      customerNote: '',
    };
    this.onCartInfo.emit(data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      if (this.product) {
        this.ref.detectChanges();
        this.deleteItemModal = false;
      }
    }
  }

  // ngAfterViewInit(): void {
  //   document.addEventListener('click', (args: any): void => {
  //     this.deleteItemModal = false;
  //     // if (args.target.tagName === 'BODY') {
  //     // }
  //   });
  // }
}

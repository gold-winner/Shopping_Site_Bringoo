import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Iso2Enum, ProductDto, ProductInput } from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() product!: ProductDto;
  @Input() category: string = '';
  @Input() productType: 'new' | 'sale' | undefined = undefined;
  @Input() disabled = false;
  @Input() count!: number;
  @Input() type: string = '';
  @Output() onClick = new EventEmitter<any>();
  @Output() onCartInfo = new EventEmitter<any>();
  bookmarked: boolean = false;
  hovered: boolean = false;

  constructor(private ref: ChangeDetectorRef) {}
  onBookmarkClick(): void {
    if (this.disabled) {
      return;
    }

    this.bookmarked = !this.bookmarked;
  }

  onClickProduct(linkId: string): void {
    const data: any = {
      linkId: linkId,
      count: this.count,
    };
    this.onClick.emit(data);
  }

  changeCart(data: ProductInput): void {
    const info: any = {
      ...data,
      type: '',
    };
    // this.count = info.count;
    this.ref.detectChanges();
    this.onCartInfo.emit(info);
  }

  changeCartInit(): void {
    const info: any = {
      linkId: this.product.linkId,
      count: 1,
      customerNote: '',
      address: {
        streets: [localStorage.getItem('streets')],
        countryCode: Iso2Enum.DE,
        city: localStorage.getItem('city'),
        zipCode: localStorage.getItem('postal'),
        location: {
          lat: localStorage.getItem('latitude'),
          lng: localStorage.getItem('longitude'),
        },
      },
      type: 'new',
    };
    // this.count = info.count;
    this.ref.detectChanges();
    this.onCartInfo.emit(info);
  }

  ngOnInit(): void {
    this.count = this.product.inCart;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.count) {
      if (this.count >= 0) this.ref.detectChanges();
    }
  }
}

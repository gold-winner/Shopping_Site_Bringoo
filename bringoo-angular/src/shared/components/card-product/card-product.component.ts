import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductLinkDetailsDto } from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() product!: ProductLinkDetailsDto;
  @Input() productType: 'new' | 'sale' | undefined = undefined;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<string>();
  selectedOption: string = 'all';

  bookmarked: boolean = false;
  hovered: boolean = false;

  onBookmarkClick(): void {
    if (this.disabled) {
      return;
    }

    this.bookmarked = !this.bookmarked;
  }

  ngOnInit(): void {}
}

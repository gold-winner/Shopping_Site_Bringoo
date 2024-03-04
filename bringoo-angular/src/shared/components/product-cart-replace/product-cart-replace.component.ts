import { Component, Input } from '@angular/core';

import { ProductLinkDetailsDto } from '../../api/data-contracts';

@Component({
  selector: 'ui-product-cart-replace',
  templateUrl: './product-cart-replace.component.html',
  styleUrls: ['./product-cart-replace.component.scss'],
})
export class ProductCartReplaceComponent {
  @Input() product_old!: ProductLinkDetailsDto;
  @Input() product_new!: ProductLinkDetailsDto;
  replaced: boolean = true;
  available: boolean = true;
}

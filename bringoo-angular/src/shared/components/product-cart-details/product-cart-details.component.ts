import { Component, Input } from '@angular/core';

import { ProductLinkDetailsDto } from '../../api/data-contracts';

@Component({
  selector: 'ui-product-cart-details',
  templateUrl: './product-cart-details.component.html',
  styleUrls: ['./product-cart-details.component.scss'],
})
export class ProductCartDetailsComponent {
  @Input() product!: ProductLinkDetailsDto;
  replaced: boolean = false;
  available: boolean = false;
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-disclaimer',
  templateUrl: 'product-disclaimer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block product-disclaimer', style: 'height: 1000px' },
})
export class ProductDisclaimerComponent implements OnInit {
  @Input() productId!: string;
  defaultFilters: any;

  ngOnInit(): void {
    this.defaultFilters = {
      productId: this.productId,
    };
  }
}

import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppStore } from 'src/shared/api/app-store';
import { Iso2Enum, ProductInput, ProductLinkDetailsDto } from 'src/shared/api/data-contracts';
@Component({
  selector: 'ui-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() productType: string | undefined;
  @Input() linkId: string = '';
  @Input() productModal: string | undefined;
  @Input() value!: number;
  @Output() onChangeCart = new EventEmitter<string>();
  @Output() onCartInfo = new EventEmitter<any>();
  detail: ProductLinkDetailsDto | undefined;
  images: any = [];
  hovered: boolean = false;
  tableData: any | undefined;
  enable: boolean = true;
  bookmarked: boolean = false;

  constructor(private ref: ChangeDetectorRef, public readonly appStore: AppStore) {}

  onBookmarkClick(): void {
    if (!this.enable) {
      return;
    }

    this.bookmarked = !this.bookmarked;
  }

  changeCart(data: ProductInput): void {
    const info: any = {
      ...data,
      type: '',
    };
    this.ref.detectChanges();
    this.onCartInfo.emit(info);
  }

  changeCartInit(): void {
    const info: any = {
      linkId: this.detail?.linkId,
      count: 1,
      customerNote: '',
      address: {
        streets: [localStorage.getItem('streets') ?? 'harburg'],
        countryCode: Iso2Enum.DE,
        city: localStorage.getItem('city') ?? 'Hamburg',
        zipCode: localStorage.getItem('postal') ?? '22305',
        location: {
          lat: Number.parseFloat(localStorage.getItem('latitude') ?? '48.4817'),
          lng: Number.parseFloat(localStorage.getItem('longitude') ?? '135.083'),
        },
      },
      type: 'new',
    };
    this.ref.detectChanges();
    this.onCartInfo.emit(info);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.productModal) {
      if (this.productModal) {
        this.appStore.productDetailsByLink(this.productModal).subscribe(
          (res: ProductLinkDetailsDto) => {
            this.detail = res;
            this.tableData = {
              'eiweiß': this.detail?.nutritional_data?.protein,
              'energie': this.detail?.nutritional_data?.calories,
              'fett': this.detail?.nutritional_data?.fatTotal,
              'Fett, davon gesättigte Fettsäuren': this.detail?.nutritional_data?.fatSaturates,
              'kohlenhydrate': this.detail?.nutritional_data?.carbohydrateTotal,
              'Kohlenhydrate, davon Zucker': this.detail?.nutritional_data?.carbohydrateSugars,
              'salz': this.detail?.nutritional_data?.salt,
            };
            this.detail?.imageUrls.map((data: string) => {
              this.images.push({ path: data });
            });
            this.ref.detectChanges();
          },
          (err: any) => {
            if (err.status === 401) window.location.href = '/';
          },
        );
      }
    }
    if (changes.value) {
      if (this.value >= 0) {
        this.ref.detectChanges();
      }
    }
  }
  //UI Interaction
  //Event Handler
  //API Interaction
}

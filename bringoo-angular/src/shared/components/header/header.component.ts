import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppCart } from 'src/shared/api/app-cart';
import { AppStore } from 'src/shared/api/app-store';
import {
  AppStoreControllerStoreProductsSearchParams,
  CartDto,
  CartInfoDto,
  CartItemDto,
  PageableProductDto,
  ProductLinkDetailsDto,
  StoreDto,
  SubcategoryDto,
} from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() cartData: CartInfoDto | undefined;
  @Input() shopCount: number = 0;
  @Input() addedProduct: ProductLinkDetailsDto | undefined;
  @Input() newItem: boolean = false;
  @Output() onShoppingCartClick = new EventEmitter<CartDto>();
  @Output() onAddressClick = new EventEmitter<Event>();
  @Output() onSidebarClick = new EventEmitter<Event>();
  innerWidth!: number;
  searchBoxPlaceHolder: string = '';
  searchInfo: string = '';
  hasRightBorder: boolean = false;
  errorCode: number | undefined;
  location: string = '';
  opened: boolean = false;
  subcategories: SubcategoryDto[] = [];
  category_selected: boolean = false;
  productsCount: number = 0;
  cartDetail: CartDto | undefined;
  enablePopup: boolean = false;
  items: CartItemDto[] = [];
  enableStore: boolean = true;
  allShop: number = 0;
  searchData: PageableProductDto | undefined;
  addedProducts: ProductLinkDetailsDto[] = [];
  storeUrl: string =
    `${JSON.parse(sessionStorage.getItem('store') ?? '')
      .name_public_short_i18n.toLowerCase()
      .split(' ')
      .join('_')}/` + `products`;

  @ViewChild('sidebar') sidebar!: any;

  constructor(private ref: ChangeDetectorRef, public readonly appStore: AppStore, public readonly appCart: AppCart, public route: Router) {
    localStorage.removeItem('productCount');
    if (route.url.includes('store-selector')) {
      this.enableStore = false;
    }
    localStorage.setItem('longitude', '53.5511');
    localStorage.setItem('latitude', '9.9937');
    localStorage.setItem('postal', '22303');
    localStorage.setItem('countryCode', 'DE');
    localStorage.setItem('city', 'hamburg');
    localStorage.setItem('streets', 'hamburg');
    localStorage.setItem('countryName', 'Germany');
    this.location = 'Hamburg, Germany';
    this.errorCode = 200;

    if (this.enableStore) {
      const store: any = JSON.parse(sessionStorage.store);
      this.appCart.cartDetails(store.id).subscribe(
        (res: CartDto) => {
          this.cartDetail = res;
          this.productsCount = this.cartDetail.productsCount;
          this.items = this.cartDetail.items;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.initialize();
  }

  initialize(): void {
    this.innerWidth = window.innerWidth;

    this.searchBoxPlaceHolder = this.innerWidth > 1200 ? 'Search in Meyer’s Frischecenter' : 'Search in..';
    this.hasRightBorder = this.innerWidth > 992 ? false : true;
  }

  onSearchChange(event: KeyboardEvent): void {
    this.searchInfo = (event.target as HTMLInputElement).value;
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      const store: StoreDto = JSON.parse(sessionStorage.store);
      const productsParams: AppStoreControllerStoreProductsSearchParams = {
        limit: 10,
        page: 1,
        // isSalePrice: true,
        id: store.id,
        search: this.searchInfo,
      };
      this.appStore.storeProductsSearch(productsParams).subscribe(
        (res: PageableProductDto) => {
          this.searchData = res;
          // console.log("searchData", this.searchData);
          // this.total = res.total;
          // this.pageCount = res.pageCount;
          // this.productsDetail = res.data;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
  }

  onSearchDelete(): void {
    this.searchInfo = '';
  }

  onSidebarOpen(event: Event): void {
    this.onSidebarClick.emit(event);
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cartData) {
      if (this.cartData) {
        this.productsCount = this.cartData.productsCount;
        this.ref.detectChanges();
        const store: any = JSON.parse(sessionStorage.store);
        this.appCart.cartDetails(store.id).subscribe(
          (res: CartDto) => {
            this.cartDetail = res;
            this.ref.detectChanges();
          },
          (err: any) => {
            if (err.status === 401) window.location.href = '/';
          },
        );
        this.ref.detectChanges();
      }
    } else if (changes.shopCount) {
      if (this.shopCount !== 0) {
        this.allShop = this.shopCount;
      }
    }
    if (changes.addedProduct && this.addedProduct && this.newItem) {
      this.enablePopup = true;
      this.addedProducts.unshift(this.addedProduct);
      this.ref.detectChanges();
      setTimeout(() => {
        this.addedProducts.pop();
        if (this.addedProducts.length === 0) {
          this.enablePopup = false;
        }
        this.ref.detectChanges();
      }, 5000);
    }
  }

  deliveryTypeData = [
    {
      id: '1',
      text: 'Pickup',
    },
    {
      id: '2',
      text: 'Delivery',
    },
    {
      id: '3',
      text: 'Shipping',
    },
  ];
}

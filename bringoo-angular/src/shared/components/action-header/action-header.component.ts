import { groupBy } from '@aeinbu/groupby';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppCart } from 'src/shared/api/app-cart';
import { AppStore } from 'src/shared/api/app-store';
import {
  AppStoreControllerStoreProductsSearchParams,
  AppStoreControllerStoresParams,
  CartDto,
  CartInfoDto,
  CartItemDto,
  Iso2Enum,
  PageableProductDto,
  PageableStoreDto,
  ProductDto,
  ProductLinkDetailsDto,
  StoreDto,
  SubcategoryDto,
} from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-action-header',
  templateUrl: './action-header.component.html',
  styleUrls: ['./action-header.component.scss'],
})
export class ActionHeaderComponent implements OnInit {
  @Input() cartData: CartInfoDto | undefined;
  @Input() shopCount: number = 0;
  @Input() addedProduct: ProductLinkDetailsDto | undefined;
  @Input() newItem: boolean = false;
  @Input() addData: any | undefined;
  @Output() onShoppingCartClick = new EventEmitter<CartDto>();
  @Output() onAddressClick = new EventEmitter<string>();
  @Output() onStoresClick = new EventEmitter<string>();
  @Output() onSidebarClick = new EventEmitter<Event>();
  innerWidth!: number;
  searchBoxPlaceHolder: string = '';
  searchInfo: string = '';
  hasRightBorder: boolean = false;
  errorCode: number | undefined;
  opened: boolean = false;
  subcategories: SubcategoryDto[] = [];
  category_selected: boolean = false;
  productsCount: number = 0;
  cartDetail: CartDto | undefined;
  enablePopup: boolean = false;
  enableSearch: boolean = false;
  items: CartItemDto[] = [];
  enableStore: boolean = true;
  allShop: number = 0;
  searchData: PageableProductDto | undefined;
  addedProducts: ProductLinkDetailsDto[] = [];
  resultsAsArray: { key: string; values: unknown[] }[] = [];
  currentStoreName: string = '';
  currentStoreImage: string = '';
  storeListData: Array<any> = [];
  @ViewChild('sidebar') sidebar!: any;

  paramsStore: AppStoreControllerStoresParams = {
    lat: 48.4817,
    lng: 135.083,
    zipCode: localStorage.getItem('postal') ?? '',
    countryCode: Iso2Enum.DE,
  };

  all_stores: StoreDto[] | undefined = [];
  total: number = 0;

  constructor(private ref: ChangeDetectorRef, public readonly appStore: AppStore, public readonly appCart: AppCart, public route: Router) {
    localStorage.removeItem('productCount');
    if (route.url.includes('store-selector')) {
      this.enableStore = false;
    }
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
      this.appStore.stores(this.paramsStore).subscribe(
        (res: PageableStoreDto) => {
          this.all_stores = res.data;
          this.total = res.total;
          this.storeListData = [];
          this.all_stores?.map((item: StoreDto) => {
            this.storeListData.push({
              id: item.id,
              url: item.heroImgUrl,
            });
          });
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
      this.currentStoreName = JSON.parse(sessionStorage.getItem('store') ?? '').name_public_long_i18n;
      this.currentStoreImage = JSON.parse(sessionStorage.getItem('store') ?? '').heroImgUrl;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.initialize();
  }

  initialize(): void {
    this.innerWidth = window.innerWidth;

    this.searchBoxPlaceHolder = this.innerWidth > 1200 ? `Search in ${this.currentStoreName}` : 'Search in..';
    this.hasRightBorder = this.innerWidth > 992 ? false : true;
  }

  onClickMode(mode: string): void {
    this.onAddressClick.emit(mode);
  }

  onSearchItems(): void {
    this.searchProdcts();
  }

  onSearchChange(event: KeyboardEvent): void {
    this.searchInfo = (event.target as HTMLInputElement).value;
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.searchProdcts();
    }
  }

  searchProdcts(): void {
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
        this.resultsAsArray = this.searchData.data.reduce(
          groupBy((x: ProductDto) => x.subcategoryName),
          [],
        );
        this.enableSearch = true;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onSearchDelete(): void {
    this.searchInfo = '';
    this.enableSearch = false;
  }

  onSidebarOpen(event: Event): void {
    this.onSidebarClick.emit(event);
  }

  onClickCover(): void {
    this.enableSearch = false;
    this.ref.detectChanges();
  }

  onClickStores(): void {
    this.onStoresClick.emit();
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cartData) {
      if (this.cartData) {
        // console.log("2", this.cartData);
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
    } else if (changes.addData) {
      if (this.addData) {
        localStorage.setItem('longitude', this.addData.lng);
        localStorage.setItem('latitude', this.addData.lat);
        localStorage.setItem('postal', this.addData.zipCode);
        localStorage.setItem('countryCode', 'DE');
        localStorage.setItem('city', this.addData.text);
        localStorage.setItem('streets', this.addData.text);
        localStorage.setItem('countryName', 'Germany');
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

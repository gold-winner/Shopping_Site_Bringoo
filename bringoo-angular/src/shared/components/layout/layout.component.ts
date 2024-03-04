import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AppCart } from 'src/shared/api/app-cart';
import { CartDto, CartInfoDto, ProductLinkDetailsDto, ProductInput } from 'src/shared/api/data-contracts';
@Component({
  selector: 'ui-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  sidebarOpened: boolean = false;
  sidbarAnimate: boolean = false;
  categorySidebarAnimate: boolean = false;
  subCategorySidebarAnimate: boolean = false;
  addressModal!: boolean | false;
  storesModal!: boolean | false;
  sidebarPosition: 'right' | 'bottom' = 'right';
  sidebarClass: string = '';
  sidebarCategory: boolean = false;
  sidebarCategoryPosition: 'left' | 'bottom' = 'left';
  sidebarCategoryClass: string = '';
  sidebarsubCategory: boolean = false;
  sidebarsubCategoryAnimate: boolean = false;
  categoryCode: string = '';
  cartDetailInfo: CartDto | undefined;
  httpClient: HttpClient;
  mapLoaded: boolean = false;
  object: object | undefined;
  selectedMode: string = '';
  enableStore: boolean = true;
  scroll: string = '';
  addInfo: string = '';
  cateUrl: string = '/';
  addData: any | undefined;
  private notifier: NotifierService;
  @Input() addedProduct: ProductLinkDetailsDto | undefined;
  @Input() cartData: CartInfoDto | undefined;
  @Input() shopCount: number = 0;
  @Input() cartChangedData: ProductInput | undefined;
  @Input() deletedCartId: string | undefined;
  @Input() newItem: boolean = false;
  @Input() topAddInfo: string = 'false';
  @Output() onSubCategoryClick = new EventEmitter<string>();
  @Output() onChangeCartDetail = new EventEmitter<CartDto>();
  @Output() onProductItem = new EventEmitter<any>();
  @Output() onGoogleMap = new EventEmitter<boolean>();
  @ViewChild('sidebar') sidebar!: any;
  @ViewChild('address') address!: any;
  @ViewChild('content') content!: any;
  @ViewChild('category') category!: any;
  @ViewChild('subcategory') subcategory!: any;

  constructor(
    httpClient: HttpClient,
    public readonly appCart: AppCart,
    private ref: ChangeDetectorRef,
    public route: Router,
    notifierService: NotifierService,
  ) {
    this.httpClient = httpClient;
    httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDs_JyEVBPXVxUM_hIfOwmOlsq9NNAWZhY&libraries=places', 'callback')
      .subscribe((res: Object) => {
        this.object = res;
        this.mapLoaded = true;
        this.onGoogleMap.emit(true);
      });
    if (
      route.url.includes('store-selector') ||
      route.url.includes('profile') ||
      route.url.includes('notification') ||
      route.url.includes('contact') ||
      route.url.includes('payment')
    ) {
      this.enableStore = false;
    }
    this.notifier = notifierService;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.initialize();
  }

  initialize(): void {
    if (window.innerWidth > 768) {
      this.sidebarPosition = 'right';
      this.sidebarClass = 'bg-white w-150 border-radius-sidebar';
      this.sidebarCategoryPosition = 'left';
      this.sidebarCategoryClass = 'bg-white w-280p category-cover';
    } else {
      this.sidebarPosition = 'bottom';
      this.sidebarClass = 'bg-white h-100p w-100p';
      this.sidebarCategoryPosition = 'left';
      this.sidebarCategoryClass = 'bg-white w-280p category-cover';
    }
  }

  onScrollTopClick(): void {
    this.content.nativeElement.scroll({ left: 0, top: 0, behavior: 'smooth' });
  }

  scrollTop(): void {
    this.sidebar._elSidebar.nativeElement.scrollTop = 0;
  }

  openCartSidebar(data: CartDto): void {
    this.cartDetailInfo = data;
    this.ref.detectChanges();
    this.sidebar.open();
  }

  closeCartSidebar(): void {
    this.sidebar.close();
  }

  addressClick(mode: string): void {
    this.selectedMode = mode;
    this.addressModal = true;
  }

  storesClick(): void {
    this.storesModal = true;
  }

  onAddressModalClose(): void {
    this.address.mapOpened = false;
    this.addressModal = false;
  }

  onStoresModalClose(): void {
    this.storesModal = false;
  }

  categorySidebar(): void {
    this.subcategory.close();
    this.sidebarCategory = !this.sidebarCategory;
  }

  closeCategorySidebar(): void {
    this.sidebarCategory = false;
  }

  SubCategorySidebar(data: any): void {
    this.subcategory.open();
    this.cateUrl = data.url;
    this.categoryCode = data.code;
  }

  closeSubCategorySidebar(): void {
    if (!this.sidebarCategory) this.subcategory.close();
  }

  onSubCategory(subCategoryCode: string): void {
    this.onSubCategoryClick.emit(subCategoryCode);
    this.subcategory.close();
    this.category.close();
  }

  handleOnScroll(): void {
    if (this.content.nativeElement.scrollTop > 200) {
      this.scroll = 'block';
    } else {
      this.scroll = 'none';
    }
  }

  onChangeDelivery(address: string): void {
    this.addInfo = address;
  }

  onChangeCart(data: ProductInput): void {
    const params: any = {
      linkId: data.linkId,
      count: data.count,
    };
    this.onProductItem.emit(params);
    this.appCart.addProduct(data).subscribe(
      (res: CartInfoDto) => {
        this.cartData = res;
        const store: any = JSON.parse(sessionStorage.store);
        this.appCart.cartDetails(store.id).subscribe(
          (res: CartDto) => {
            this.cartDetailInfo = res;
            this.ref.detectChanges();
            this.onChangeCartDetail.emit(this.cartDetailInfo);
          },
          (err: any) => {
            if (err.error.message === 'Cart not found') {
              this.cartDetailInfo = undefined;
              window.location.reload();
            }
            this.ref.detectChanges();
            this.onChangeCartDetail.emit(this.cartDetailInfo);
            if (err.status === 401) window.location.href = '/';
          },
        );
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onChangeAddress(data: any): void {
    this.addData = data;
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.initialize();
    setTimeout(() => {
      this.sidbarAnimate = true;
      this.categorySidebarAnimate = true;
      this.subCategorySidebarAnimate = true;
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cartData) {
      if (this.cartData) {
        // console.log("cart", this.cartData);
        const store: any = JSON.parse(sessionStorage.store);
        this.appCart.cartDetails(store.id).subscribe(
          (res: CartDto) => {
            this.cartDetailInfo = res;
            this.ref.detectChanges();
          },
          (err: any) => {
            if (err.status === 401) window.location.href = '/';
          },
        );
        this.ref.detectChanges();
      }
    } else if (changes.cartChangedData) {
      if (this.cartChangedData) {
        this.onChangeCart(this.cartChangedData);
      }
    } else if (changes.deletedCartId) {
      if (this.deletedCartId) {
        this.appCart.delete(this.deletedCartId).subscribe(
          (res: boolean) => {
            if (res) {
              this.cartData = undefined;
              this.cartDetailInfo = undefined;
              this.onChangeCartDetail.emit(this.cartDetailInfo);
              this.notifier.notify('info', 'Your cart is successfully deleted!');
              const store_name: string = JSON.parse(sessionStorage.getItem('store') ?? '')
                .name_public_short_i18n.toLowerCase()
                .split(' ')
                .join('_');
              const url: string = `/${store_name}/products`;
              window.location.href = url;
              this.ref.detectChanges();
            }
          },
          (err: any) => {
            if (err.status === 401) window.location.href = '/';
          },
        );
      }
    } else if (changes.addedProduct) {
      if (this.addedProduct) {
        this.ref.detectChanges();
      }
    } else if (changes.topAddInfo) {
      this.addInfo = this.topAddInfo;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppCart } from 'src/shared/api/app-cart';
import { AppStore } from 'src/shared/api/app-store';
import {
  AppStoreControllerStoreProductsParams,
  CartInfoDto,
  CategoryDto,
  PageableProductDto,
  ProductDto,
  ProductLinkDetailsDto,
  StoreDto,
} from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productModal: string | undefined;
  categoryDetail: CategoryDto[] = [];
  PageableProductDetail: PageableProductDto[] = [];
  error_code: string = '';
  category: string = '';
  productDetail: ProductLinkDetailsDto | undefined;
  addedProduct: ProductLinkDetailsDto | undefined;
  count: number = 0;
  linkId: string = '';
  cartData: CartInfoDto | undefined;
  newItem: boolean = false;

  constructor(public readonly appStore: AppStore, public readonly appCart: AppCart, private ref: ChangeDetectorRef) {
    const store: StoreDto = JSON.parse(sessionStorage.store);
    this.appStore.categoriesSubcategories(store.id).subscribe(
      (res: CategoryDto[]) => {
        this.categoryDetail = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    const storeProducts: AppStoreControllerStoreProductsParams = {
      limit: 5,
      page: 1,
      isSalePrice: true,
      id: store.id,
    };
    this.appStore.storeProducts(storeProducts).subscribe(
      (res: PageableProductDto[]) => {
        this.PageableProductDetail = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onProductItem(data: any): void {
    this.count = data.count;
    this.linkId = data.linkId;
    this.PageableProductDetail.map((productdata: PageableProductDto) => {
      const foundIndex: number = productdata.data.findIndex((item: ProductDto) => item.linkId === this.linkId);
      productdata.data[foundIndex] = {
        ...productdata.data[foundIndex],
        inCart: this.count,
      };
    });
    this.ref.detectChanges();
  }

  onProductClick(data: any): void {
    this.productModal = data.linkId;
    this.count = data.count;
    this.ref.detectChanges();
    if (this.productModal) {
      this.appStore.productDetailsByLink(this.productModal).subscribe(
        (res: ProductLinkDetailsDto) => {
          this.productDetail = res;
          this.category = `${res.categoryName} > ${res.subcategoryName}`;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
  }

  onCartDetail(data: any): void {
    if (data.type === 'new') {
      this.newItem = true;
    } else {
      this.newItem = false;
    }
    this.count = data.count;
    this.linkId = data.linkId;
    delete data.type;
    // console.log("0", data);
    this.appCart.addProduct(data).subscribe(
      (res: CartInfoDto) => {
        this.cartData = res;
        // console.log("1", this.cartData);
        this.PageableProductDetail.map((productdata: PageableProductDto) => {
          const foundIndex: number = productdata.data.findIndex((item: ProductDto) => item.linkId === this.linkId);
          productdata.data[foundIndex] = {
            ...productdata.data[foundIndex],
            inCart: this.count,
          };
        });
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.appStore.productDetailsByLink(this.linkId).subscribe(
      (res: ProductLinkDetailsDto) => {
        this.addedProduct = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.ref.detectChanges();
  }

  onProductModalClose(): void {
    this.productModal = undefined;
  }

  ngOnInit(): void {}
}

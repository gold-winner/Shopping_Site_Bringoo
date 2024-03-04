import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
// import { ProductsDetailData } from 'src/app/example/components/cards/cards.mock';
import { AppStore } from 'src/shared/api/app-store';
import { AppStoreControllerStoreProductsParams, PageableProductDto, ProductDto, StoreDto } from 'src/shared/api/data-contracts';

import { IOption } from '../../../../../shared/components/option';
@Component({
  selector: 'ui-settings-favorite',
  templateUrl: './settings-favorite.component.html',
  styleUrls: ['./settings-favorite.component.scss'],
})
export class SettingsFavoriteComponent implements OnInit {
  productsDetail = null;
  selectedOption: string = 'all';
  options: IOption[] = [];
  productModal: string | undefined;
  favoriteProductDetail: PageableProductDto[] = [];
  favoriteProducts: ProductDto[] = [];
  isGuest: boolean = true;

  constructor(public readonly appStore: AppStore, private ref: ChangeDetectorRef) {
    const store: StoreDto = JSON.parse(sessionStorage.store);
    const storeProducts: AppStoreControllerStoreProductsParams = {
      limit: 20,
      page: 1,
      isSalePrice: true,
      id: store.id,
    };
    this.appStore.storeProducts(storeProducts).subscribe(
      (res: PageableProductDto[]) => {
        this.favoriteProductDetail = res;
        this.favoriteProducts = res[0].data;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    if (localStorage.getItem('customerAccessToken')) {
      this.isGuest = false;
    } else {
      this.isGuest = true;
    }
  }

  onProductClick(id: string): void {
    this.productModal = id;
  }

  onProductModalClose(): void {
    this.productModal = undefined;
  }

  onChangeOption(option: string): void {
    const store: StoreDto = JSON.parse(sessionStorage.store);
    this.selectedOption = option;
    const storeProducts: AppStoreControllerStoreProductsParams = {
      limit: 20,
      page: 1,
      isSalePrice: true,
      id: store.id,
    };
    this.appStore.storeProducts(storeProducts).subscribe(
      (res: PageableProductDto[]) => {
        this.favoriteProductDetail = res;
        const fproducts: any = res[0].data;
        this.favoriteProducts = [];
        fproducts.map((data: any, index: number) => {
          if (option === 'in_stock' && !data.outOfStock) this.favoriteProducts.push(fproducts[index]);
          if (option === 'not_available' && data.outOfStock) this.favoriteProducts.push(fproducts[index]);
        });
        if (option === 'all') this.favoriteProducts = fproducts;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  ngOnInit(): void {
    this.options = [
      {
        id: 'all',
        label: 'All',
      },
      {
        id: 'in_stock',
        label: 'In stock',
      },
      {
        id: 'not_available',
        label: 'Not available',
      },
    ];
  }
}

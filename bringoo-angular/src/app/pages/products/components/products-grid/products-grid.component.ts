import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCart } from 'src/shared/api/app-cart';
import { AppStore } from 'src/shared/api/app-store';
import {
  AppStoreControllerStoreProductsForCategoryParams,
  AppStoreControllerStoreProductsForSubCategoryParams,
  AppStoreControllerStoreProductsSearchParams,
  CartInfoDto,
  CategoryDto,
  PageableProductDto,
  ProductDto,
  ProductLinkDetailsDto,
  StoreDto,
  SubcategoryDto,
} from 'src/shared/api/data-contracts';

import { IOption } from '../../../../../shared/components/option';
@Component({
  selector: 'ui-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent implements OnInit {
  selectedSubcategory: string = 'all';
  subcategories: IOption[] = [];
  categories: Array<{ id: string; name: string }> = [];
  notification: boolean = false;
  productModal: string | undefined;
  categoryDetail: CategoryDto[] = [];
  productsDetail: ProductDto[] = [];
  subCategories: CategoryDto | undefined;
  categoryName: string = history.state.name;
  categoryCode: string = this.route.snapshot.queryParams['category'].toUpperCase();
  subcategoryCode: string = '';
  countPerPage: number = 10;
  currentPageNum: number = 1;
  total: number | undefined;
  pageCount: number | undefined;
  category: string = '';
  productDetail: ProductLinkDetailsDto | undefined;
  count: number = 0;
  linkId: string = '';
  cartData: CartInfoDto | undefined;
  newItem: boolean = false;
  addedProduct: ProductLinkDetailsDto | undefined;
  categoryTitle: string = '';

  constructor(
    public readonly appStore: AppStore,
    public readonly appCart: AppCart,
    private ref: ChangeDetectorRef,
    public route: ActivatedRoute,
  ) {
    this.categoryTitle = this.categoryCode[0].toUpperCase() + this.categoryCode.slice(1).toLowerCase();
    const store: StoreDto = JSON.parse(sessionStorage.store);
    this.appStore.categoriesSubcategories(store.id).subscribe(
      (res: CategoryDto[]) => {
        this.categoryDetail = res;
        this.subCategories = this.categoryDetail.find((item: CategoryDto) => {
          return item.code === this.categoryCode;
        });
        this.subCategories &&
          this.subCategories.subcategories.map((data: SubcategoryDto, index: number) => {
            this.subcategories[index] = { id: data.code, label: data.name_i18n };
          });
        this.subcategories = [{ id: 'all', label: 'All' }].concat(this.subcategories);
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.subcategoryCode = history.state.subcategory ? history.state.subcategory : '';
    if (this.subcategoryCode === '') {
      const categoryParams: AppStoreControllerStoreProductsForCategoryParams = {
        limit: this.countPerPage,
        page: this.currentPageNum,
        // isSalePrice: true,
        id: store.id,
        code: this.categoryCode,
      };
      this.appStore.storeProductsForCategory(categoryParams).subscribe(
        (res: PageableProductDto) => {
          this.total = res.total;
          this.pageCount = res.pageCount;
          this.productsDetail = res.data;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
  }

  getProducts(sub_category: string): void {
    this.selectedSubcategory = sub_category;
    const store: StoreDto = JSON.parse(sessionStorage.store);
    if (sub_category === 'all') {
      const categoryParams: AppStoreControllerStoreProductsForCategoryParams = {
        limit: this.countPerPage,
        page: this.currentPageNum,
        // isSalePrice: true,
        id: store.id,
        code: this.categoryCode,
      };
      this.appStore.storeProductsForCategory(categoryParams).subscribe(
        (res: PageableProductDto) => {
          this.total = res.total;
          this.pageCount = res.pageCount;
          this.productsDetail = res.data;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    } else {
      const subCategoryParams: AppStoreControllerStoreProductsForSubCategoryParams = {
        limit: this.countPerPage,
        page: this.currentPageNum,
        // isSalePrice: true,
        id: store.id,
        code: sub_category,
      };
      this.appStore.storeProductsForSubCategory(subCategoryParams).subscribe(
        (res: PageableProductDto) => {
          this.total = res.total;
          this.pageCount = res.pageCount;
          this.productsDetail = res.data;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
  }

  onChangeSubcategory(subcategory: string): void {
    this.currentPageNum = 1;
    this.getProducts(subcategory);
  }

  onChangeSize(size: number): void {
    this.countPerPage = size;
    this.currentPageNum = 1;
    this.getProducts(this.selectedSubcategory);
  }

  onClickPage(page: number): void {
    this.currentPageNum = page;
    this.getProducts(this.selectedSubcategory);
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

  onProductModalClose(): void {
    this.productModal = undefined;
  }

  onProductSearch(search: string): void {
    const store: StoreDto = JSON.parse(sessionStorage.store);
    const productsParams: AppStoreControllerStoreProductsSearchParams = {
      limit: this.countPerPage,
      page: this.currentPageNum,
      // isSalePrice: true,
      id: store.id,
      search: search,
    };
    this.appStore.storeProductsSearch(productsParams).subscribe(
      (res: PageableProductDto) => {
        this.total = res.total;
        this.pageCount = res.pageCount;
        this.productsDetail = res.data;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  clickSubCategory(subCategoryCode: string): void {
    this.subcategories = [];
    this.categoryCode = this.route.snapshot.queryParams['category'].toUpperCase();
    this.categoryTitle = this.categoryCode[0].toUpperCase() + this.categoryCode.slice(1).toLowerCase();
    const store: StoreDto = JSON.parse(sessionStorage.store);
    this.appStore.categoriesSubcategories(store.id).subscribe(
      (res: CategoryDto[]) => {
        this.categoryDetail = res;
        this.subCategories = this.categoryDetail.find((item: CategoryDto) => {
          return item.code === this.categoryCode;
        });
        this.subCategories &&
          this.subCategories.subcategories.map((data: SubcategoryDto, index: number) => {
            this.subcategories[index] = { id: data.code, label: data.name_i18n };
          });
        this.subcategories = [{ id: 'all', label: 'All' }].concat(this.subcategories);
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.subcategoryCode = history.state.subcategory ? history.state.subcategory : '';
    if (this.subcategoryCode === '') {
      const categoryParams: AppStoreControllerStoreProductsForCategoryParams = {
        limit: this.countPerPage,
        page: this.currentPageNum,
        // isSalePrice: true,
        id: store.id,
        code: this.categoryCode,
      };
      this.appStore.storeProductsForCategory(categoryParams).subscribe(
        (res: PageableProductDto) => {
          this.total = res.total;
          this.pageCount = res.pageCount;
          this.productsDetail = res.data;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
    this.currentPageNum = 1;
    const subCategory: string = subCategoryCode.split(':')[1];
    this.getProducts(subCategory);
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
    this.appCart.addProduct(data).subscribe(
      (res: CartInfoDto) => {
        this.cartData = res;
        const foundIndex: number = this.productsDetail.findIndex((item: ProductDto) => item.linkId === this.linkId);
        this.productsDetail[foundIndex] = {
          ...this.productsDetail[foundIndex],
          inCart: this.count,
        };
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

  onProductItem(data: any): void {
    this.count = data.count;
    this.linkId = data.linkId;
    const foundIndex: number = this.productsDetail.findIndex((item: ProductDto) => item.linkId === this.linkId);
    this.productsDetail[foundIndex] = {
      ...this.productsDetail[foundIndex],
      inCart: this.count,
    };
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.subcategoryCode = history.state.subcategory ? history.state.subcategory : '';
    if (this.subcategoryCode !== '') {
      this.onChangeSubcategory(this.subcategoryCode);
    }
  }
}

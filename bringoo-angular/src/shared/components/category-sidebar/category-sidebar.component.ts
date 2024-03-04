import { Component, EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppStore } from 'src/shared/api/app-store';
import { CategoryDto, StoreDto, SubcategoryDto } from 'src/shared/api/data-contracts';

// import { ProductsData } from '../../../app/example/components/cards/cards.mock';
@Component({
  selector: 'ui-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss'],
})
export class CategorySidebarComponent {
  @Output() onCloseCategorySidebar = new EventEmitter<Event>();
  @Output() onCategorySelect = new EventEmitter<string>();
  @Output() onCategoryUnselect = new EventEmitter();
  productsData = null;
  voucherModal: boolean = false;
  categoryDetail: CategoryDto[] = [];
  subcategories: SubcategoryDto[] = [];
  selected_code: string = '';
  cateUrl: string = '/';

  constructor(private ref: ChangeDetectorRef, public readonly appStore: AppStore) {
    if (sessionStorage.store) {
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
    }
  }

  onAddVoucherClick(): void {
    this.voucherModal = true;
  }

  onVoucherModalClose(): void {
    this.voucherModal = false;
  }

  onSidebarClose(): void {
    this.onCloseCategorySidebar.emit();
  }

  onCategoryOver(code: string): void {
    this.cateUrl =
      `${JSON.parse(sessionStorage.getItem('store') ?? '')
        .name_public_short_i18n.toLowerCase()
        .split(' ')
        .join('_')}/` + `products/categories`;
    this.cateUrl = `/${this.cateUrl}`;
    this.selected_code = code;
    const data: any = {
      url: this.cateUrl,
      code: this.selected_code,
    };
    this.onCategorySelect.emit(data);
  }

  onCategoryOut(): void {
    this.onCategoryUnselect.emit();
  }
}

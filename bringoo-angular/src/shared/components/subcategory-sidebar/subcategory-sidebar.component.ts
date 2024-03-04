import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from 'src/shared/api/app-store';
import { CategoryDto, StoreDto, SubcategoryDto } from 'src/shared/api/data-contracts';
@Component({
  selector: 'ui-subcategory-sidebar',
  templateUrl: './subcategory-sidebar.component.html',
  styleUrls: ['./subcategory-sidebar.component.scss'],
})
export class SubCategorySidebarComponent {
  @Input() code: string = '';
  @Input() cateUrl: string = '';
  @Output() clickSubCategory = new EventEmitter<string>();
  categoryDetail: CategoryDto[] = [];
  subcategories: SubcategoryDto[] = [];
  selected_subCategory: string = '';
  categoryUrl: string = '';
  url: boolean = false;

  constructor(private ref: ChangeDetectorRef, public readonly appStore: AppStore, private router: Router) {
    if (sessionStorage.store) {
      const store: StoreDto = JSON.parse(sessionStorage.store);
      this.appStore.categoriesSubcategories(store.id).subscribe(
        (res: CategoryDto[]) => {
          this.categoryDetail = res;
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
  }

  onsubCategoryOver(code: string): void {
    this.selected_subCategory = code;
  }

  onsubCategoryClick(code: string): void {
    this.selected_subCategory = code;
    this.clickSubCategory.emit(code);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.code) {
      const sub: CategoryDto[] = this.categoryDetail.filter((item: CategoryDto) => {
        return item.code === this.code;
      });
      if (sub.length > 0) this.subcategories = sub[0].subcategories;
      this.url = this.router.url.includes('category');
      this.categoryUrl = this.cateUrl;
      this.ref.detectChanges();
    }
  }
}

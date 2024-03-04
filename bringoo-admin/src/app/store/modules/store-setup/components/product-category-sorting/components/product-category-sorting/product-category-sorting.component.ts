import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent } from 'ng-zorro-antd/core/tree';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreCategorySortDto, StoreSubcategorySortDto } from '../../../../../../../../shared/api/auth/data-contracts';
import { ProductCategorySortService } from '../../../../../../../../shared/api/auth/product-category-sort.service';
import { ProductSubcategorySortService } from '../../../../../../../../shared/api/auth/product-subcategory-sort.service';
import { IsRightCategory } from '../../../../../../../../shared/helpers/is-right-category';
import { StoreCategorySettingsFilterType } from '../../../../../../../../shared/types/store-category-settings-filter.type';

@Component({
  selector: 'app-product-category-sorting',
  templateUrl: 'product-category-sorting.component.html',
  styleUrls: [
    '../../../store-product-category-and-groups/components/store-product-category-and-groups/product-category-and-groups.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategorySortingComponent implements OnInit {
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
  tree$!: Observable<NzTreeNodeOptions[]>;
  filters: BehaviorSubject<StoreCategorySettingsFilterType> = new BehaviorSubject<StoreCategorySettingsFilterType>({});

  storeId!: string;
  searchValue$: Observable<string> = this.filters
    .asObservable()
    .pipe(map(({ search, vendorCategoryCode }: StoreCategorySettingsFilterType): string => `${search}${vendorCategoryCode}`));

  constructor(
    private readonly categorySort: ProductCategorySortService,
    private readonly subcategorySort: ProductSubcategorySortService,
    private readonly route: ActivatedRoute,
    private readonly notification: NzNotificationService,
  ) {
    this.storeId = this.route.parent?.parent?.snapshot.params['id'] || '';
  }

  ngOnInit(): void {
    this.nodeSubscribe();
  }

  nodeSubscribe(): void {
    this.tree$ = this.categorySort
      .getStoreCategories(this.storeId)
      .pipe(map((values: StoreCategorySortDto[]) => this.buildNzTreeNodeCategories(values)));
  }

  buildNzTreeNodeCategories(items: StoreCategorySortDto[]): NzTreeNodeOptions[] {
    return items.map(
      (category: StoreCategorySortDto): NzTreeNodeOptions => {
        return {
          title: `${category.name_i18n} (${category.vendorCategoryCode})`,
          key: `${category.storeCategorySortId},${category.categoryCode}` ?? '',
          isLeaf: false,
          expanded: false,
          icon: 'drag',
        };
      },
    );
  }

  nzEvent(event: NzFormatEmitEvent): void {
    if (event.eventName === 'expand' && event.node && event) {
      const node: NzTreeNode = event.node;
      if (node.getChildren().length === 0) {
        const [, categoryCode]: [string, string] = node.key.split(',') as [string, string];
        this.subcategorySort
          .getStoreSubcategories(this.storeId, categoryCode)
          .pipe(map((values: StoreSubcategorySortDto[]) => this.buildNzTreeNodeSubcategories(values)))
          .subscribe((children: NzTreeNodeOptions[]) => node.addChildren(children));
      }
    }
  }

  buildNzTreeNodeSubcategories(items: StoreSubcategorySortDto[]): NzTreeNodeOptions[] {
    return items.map(
      ({ storeSubcategorySortId, subcategoryCode, name_i18n }: StoreSubcategorySortDto): NzTreeNodeOptions => ({
        title: name_i18n || '',
        key: `${storeSubcategorySortId},${subcategoryCode}`,
        isLeaf: true,
        icon: 'drag',
      }),
    );
  }

  beforeDrop: (event: NzFormatBeforeDropEvent) => Observable<boolean> = (event: NzFormatBeforeDropEvent): Observable<boolean> => {
    if (event.dragNode.level === event.node.level) {
      if (event.dragNode.parentNode && event.node.parentNode) {
        this.swapSubcategories(event.dragNode, event.node);
      } else {
        this.swapCategories(event.dragNode, event.node);
      }
    } else {
      this.notification.error('Wrong sorting', `Can't swap category with subcategory.`);
    }
    return of(false);
  };

  swapSubcategories(dragNode: NzTreeNode, node: NzTreeNode): void {
    if (dragNode.parentNode?.title === node.parentNode?.title) {
      const sourceId: string = dragNode.key.split(',')[0];
      const targetId: string = node.key.split(',')[0];
      this.subcategorySort.changeStoreOrder(this.storeId, { sourceId, targetId }).subscribe(() => {
        this.notification.success(`Swap subcategory`, `Swap queue for ${dragNode.title} and ${node.title}`);
        this.swapNodeDataUI(dragNode, node);
      });
    } else {
      this.notification.error('Wrong sorting', `Can't swap subcategory from different category.`);
    }
  }

  swapCategories(dragNode: NzTreeNode, node: NzTreeNode): void {
    const sourceId: string = dragNode.key.split(',')[0];
    const targetId: string = node.key.split(',')[0];

    dragNode.setExpanded(false);
    node.setExpanded(false);

    this.categorySort.changeStoreOrder(this.storeId, { sourceId, targetId }).subscribe(() => {
      this.notification.success(`Swap category queue`, `Swap queue for ${dragNode.title} and ${node.title}`);
      this.swapNodeDataUI(dragNode, node);
    });
  }

  swapNodeDataUI(dragNode: NzTreeNode, node: NzTreeNode): void {
    const dragChildren: NzTreeNode[] = dragNode.getChildren();
    const title: string = dragNode.title;
    const key: string = dragNode.key;

    dragNode.clearChildren();
    dragNode.addChildren(node.getChildren());
    dragNode.title = node.title;
    dragNode.key = node.key;

    node.clearChildren();
    node.addChildren(dragChildren);
    node.title = title;
    node.key = key;
  }

  searchFunc: (node: NzTreeNodeOptions) => boolean = (node: NzTreeNodeOptions): boolean =>
    IsRightCategory(this.filters.getValue(), node, this.nzTreeComponent);

  onChangeFilters(filters: StoreCategorySettingsFilterType): void {
    this.filters.next(filters);
  }
}

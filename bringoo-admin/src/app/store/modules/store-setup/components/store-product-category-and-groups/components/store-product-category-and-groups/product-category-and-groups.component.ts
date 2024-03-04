import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { CrudCategoriesAndGroupsTemplateService } from '../../../../../../../../shared/api/auth/crud-categories-and-groups-template.service';
import { CrudProductCategoryService } from '../../../../../../../../shared/api/auth/crud-product-category.service';
import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import {
  CategoriesAndGroupsTemplateEntity,
  ImportDto,
  Pageable,
  ProductCategoryEntity,
  ProductSubcategoryEntity,
  StoreEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { saveBlobAsFile } from '../../../../../../../../shared/helpers/file-saver';
import { IsRightCategory } from '../../../../../../../../shared/helpers/is-right-category';
import { StoreCategorySettingsFilterType } from '../../../../../../../../shared/types/store-category-settings-filter.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';

@UntilDestroy()
@Component({
  selector: 'app-product-category-and-groups',
  styleUrls: ['product-category-and-groups.component.scss'],
  templateUrl: './product-category-and-groups.component.html',
})
export class ProductCategoryAndGroupsComponent implements OnInit, OnDestroy {
  defaultCheckedKeys: string[] = [];
  openPanel: 'import' | 'saveTemplate' | 'loadTemplate' | undefined;
  importDto: ImportDto | null = null;
  startImport: symbol | undefined;

  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;

  load: BehaviorSubject<string[] | null> = new BehaviorSubject<string[] | null>(null);
  nodes$!: Observable<NzTreeNodeOptions[] | undefined>;

  isLoading$: Observable<boolean> = this.service.isLoading$;
  id: string = '';
  storeSubcategories: string[] = [];
  storeCode: string | undefined;
  loadTemplateId: string | null = null;

  filters: BehaviorSubject<StoreCategorySettingsFilterType> = new BehaviorSubject<StoreCategorySettingsFilterType>({});

  searchValue$: Observable<string> = this.filters
    .asObservable()
    .pipe(map(({ search, vendorCategoryCode }: StoreCategorySettingsFilterType): string => `${search ?? ''}${vendorCategoryCode ?? ''}`));

  constructor(
    private productCategory: CrudProductCategoryService,
    private activeRoute: ActivatedRoute,
    private service: CrudStoreService,
    private storeDetailsService: StoreDetailsService,
    private readonly notification: NzNotificationService,
    private readonly templateService: CrudCategoriesAndGroupsTemplateService,
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.parent?.parent?.snapshot.params['id'] || '';
    this.nodeSubscribe();
  }

  nodeSubscribe(): void {
    this.nodes$ = this.load.asObservable().pipe(
      untilDestroyed(this),
      switchMap(() => this.service.findOne(this.id, { join: ['subcategories||name_i18n,code,categoryCode,isActive'] })),
      tap((store: StoreEntity) => {
        this.storeCode = store.code;
        const loadTemplate: string[] | null = this.load.getValue();

        if (loadTemplate) {
          this.storeSubcategories = loadTemplate;
        } else if (store.subcategories) {
          this.storeSubcategories = store.subcategories.map(({ code }: ProductSubcategoryEntity): string => code ?? '');
        }
      }),
      switchMap(
        (): Observable<Pageable & { items?: ProductCategoryEntity[] }> =>
          this.productCategory.find({
            fields: ['code', 'name_i18n', 'isActive', 'vendorCategoryCode'].join(','),
            sort: ['name_i18n,ASC', 'subcategories.name_i18n,ASC'],
            join: ['subcategories||name_i18n,code,isActive'],
          }),
      ),
      map(
        (categoryWithSubcategories: Pageable & { items?: ProductCategoryEntity[] }) =>
          categoryWithSubcategories.items && this.buildNzTreeNode(categoryWithSubcategories.items),
      ),
    );
    this.load.next(null);
  }

  buildNzTreeNode(items: ProductCategoryEntity[]): NzTreeNodeOptions[] {
    const chekedSubcategoryes: string[] = [];

    const rootNode: NzTreeNodeOptions[] = items.map(
      (category: ProductCategoryEntity): NzTreeNodeOptions => {
        const subcategoryNode: NzTreeNodeOptions[] | undefined = category.subcategories?.map(
          (subcategory: ProductSubcategoryEntity): NzTreeNodeOptions => {
            return {
              title: subcategory.name_i18n ?? '',
              key: subcategory.code ?? '',
              isLeaf: true,
              icon: !category.isActive || !subcategory.isActive ? 'stop' : '',
              checked: this.storeSubcategories.some(
                (subcategoryCode: string) =>
                  subcategory?.code && subcategoryCode === subcategory.code && chekedSubcategoryes.push(subcategory.code),
              ),
            };
          },
        );
        return {
          title: `${category.name_i18n} (${category.vendorCategoryCode})`,
          key: category.code ?? '',
          children: subcategoryNode,
          icon: !category.isActive ? 'stop' : '',
        };
      },
    );

    this.defaultCheckedKeys = [...chekedSubcategoryes];

    return rootNode;
  }

  onSubmit(): void {
    const subcategoryCodes: string[] = this.nzTreeComponent.getCheckedNodeList().reduce((acc: string[], v: NzTreeNode) => {
      if (v.level === 0) {
        const str: string[] = v.children.map((value: NzTreeNode) => value.key);
        return [...acc, ...str];
      }
      return [...acc, v.key];
    }, []);
    this.service
      .categories(this.id, { subcategoryCodes })
      .subscribe(() => this.notification.success('Category and Groups', 'Successfully updated'));
  }

  onCancel(): void {
    this.load.next(null);
  }

  ngOnDestroy(): void {}

  onShowImportForm(): void {
    this.openPanel = 'import';
  }

  onExport(fileExt: string): void {
    this.service
      .exportSubcategories({
        fileExt,
        storeId: this.id,
      })
      .pipe(
        untilDestroyed(this),
        take(1),
        tap((response: any) => {
          saveBlobAsFile(
            response,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
            `store-category-export-${this.storeCode}.${fileExt.toLowerCase()}`,
          );
        }),
      )
      .subscribe();
  }

  onImport(formData: FormData): void {
    const customImportParams: Record<string, string> = { storeId: this.id };

    for (const key of Object.keys(customImportParams)) {
      formData.append(key, customImportParams[key]);
    }

    this.service
      .importSubcategories(formData as any)
      .pipe(
        untilDestroyed(this),
        take(1),
        tap((response: ImportDto) => {
          this.importDto = response;
        }),
      )
      .subscribe();
  }

  onCloseDrawerAndReload(): void {
    this.openPanel = undefined;
    this.load.next(null);
  }

  onCloseDrawer(): void {
    this.openPanel = undefined;
  }

  changeTemplateId(id: string): void {
    this.loadTemplateId = id;
  }

  onLoadTemplate(): void {
    if (this.loadTemplateId) {
      this.templateService
        .findOne(this.loadTemplateId, { fields: 'subcategoryCodes' })
        .subscribe(({ subcategoryCodes }: CategoriesAndGroupsTemplateEntity) => {
          if (subcategoryCodes) {
            this.load.next([...subcategoryCodes]);
          }
          this.onCloseDrawer();
        });
    }
  }

  onImportButtonClick(): void {
    this.startImport = Symbol('import');
  }

  searchFunc: (node: NzTreeNodeOptions) => boolean = (node: NzTreeNodeOptions): boolean =>
    IsRightCategory(this.filters.getValue(), node, this.nzTreeComponent);

  onChangeFilters(filters: StoreCategorySettingsFilterType): void {
    this.filters.next(filters);
  }
}

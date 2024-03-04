import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CrudProductLinkService } from '../../../../../../../../shared/api/auth/crud-product-link.service';
import { Pageable, ProductLinkEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { PRODUCT_LINK_TABLE_FIELDS, PRODUCT_LINK_TABLE_JOIN } from '../../../../../../../../shared/config/product-link-table.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { ProductLinkFilterComponent } from './product-link-filter/product-link-filter.component';

@Component({
  selector: 'app-add-products-by-link',
  templateUrl: 'product-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLinkComponent implements OnInit {
  @Output() productLinkIds: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() productIds?: string[];
  @Input() checkedProductIds?: string[] | null;
  @Input() showCheckboxes: boolean = true;
  @Input() isUseChangeVisibleMode: boolean = true;

  customFilters: BehaviorSubject<any> = new BehaviorSubject<any>({});
  defaultCheckedIds!: string[];
  checkedIds: string[] = [];
  isShowSelected: boolean = false;

  filterForm: Type<DynamicFilterFormComponent> = ProductLinkFilterComponent;

  fields: CrudFields<ProductLinkEntity> = PRODUCT_LINK_TABLE_FIELDS;
  join: string[] = PRODUCT_LINK_TABLE_JOIN;
  customImportParams: any;

  config: CrudConfig = {
    title: 'Products',
    plural: 'Products',
    single: 'Product',
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    useTableHeightCalculation: false,
    isActionColumnVisible: false,
  };

  columns: CrudColumn<ProductLinkEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.imageUrls ? item.product.imageUrls[0] : '';
      },
      type: 'image',
    },
    {
      label: 'Name',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return `${item.product?.name_i18n} \n Barcode (EAN) ${item.product?.ean}`;
      },
      type: 'text',
    },
    {
      label: 'Brand',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.productBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Category',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.category?.name_i18n ?? '';
      },
      type: 'text',
    },
    {
      label: 'Sub-category',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return item.product?.subcategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Measurement',
      isSortable: false,
      getField(item: ProductLinkEntity): EntityValue {
        return [item.product?.productMeasurement, `${item.product?.productUnit?.name_i18n}`].join('/');
      },
      type: 'text',
    },
  ];

  constructor(
    public readonly service: CrudProductLinkService,
    public readonly route: ActivatedRoute,
    public readonly storeDetailsService: StoreDetailsService,
  ) {}

  ngOnInit(): void {
    if (this.productIds) {
      this.customFilters.next({
        'product.id': { $in: this.productIds },
      });
      this.isUseChangeVisibleMode = false;
    }

    if (this.checkedProductIds) {
      this.findProductLinkIds(this.checkedProductIds);
    }
  }

  onCheckProduct(ids: string[]): void {
    this.productLinkIds.emit(ids);
    this.checkedIds = ids;
  }

  findProductLinkIds(ids: string[]): void {
    this.service
      .find({
        fields: 'id',
        join: ['product||id'],
        s: JSON.stringify({
          'product.id': { $in: ids },
        }),
      })
      .pipe(map(({ items }: Pageable & { items?: ProductLinkEntity[] }) => items ?? []))
      .subscribe((items: ProductLinkEntity[]) => {
        this.defaultCheckedIds = items.map(({ id }: ProductLinkEntity) => id);
        this.checkedIds = this.defaultCheckedIds;
      });
  }

  onShowModeChange(): void {
    this.isShowSelected = !this.isShowSelected;

    if (this.isShowSelected) {
      this.customFilters.next({
        id: { $in: this.checkedIds },
      });
    } else {
      this.customFilters.next({});
    }
  }
}

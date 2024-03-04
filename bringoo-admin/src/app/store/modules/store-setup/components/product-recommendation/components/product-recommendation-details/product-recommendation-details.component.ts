import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CrudProductRecommendationService } from '../../../../../../../../shared/api/auth/crud-product-recommendation.service';
import { CrudProductRecommendationItemService } from '../../../../../../../../shared/api/auth/crud-product-recommendation-item.service';
import {
  ProductRecommendationEntity,
  ProductRecommendationItemEntity,
  StoreProductRecommendationUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';
import { SelectProductLinkFilterFormComponent } from '../select-product-link-filter-form/select-product-link-filter-form.component';

type FormType = ToFormGroupType<StoreProductRecommendationUpdateInput & { id: string; storeId: string; productLinkIds: string[] }>;

@UntilDestroy()
@Component({
  selector: 'app-product-recommendation-details',
  templateUrl: 'product-recommendation-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mx-4 mt-8 mb-4 d-block' },
})
export class ProductRecommendationDetailsComponent extends DynamicForm<ProductRecommendationEntity> {
  form: FormGroup<FormType> = new FormGroup<FormType>({
    id: new FormControl(null, [Validators.required]),
    storeId: new FormControl(this.route?.parent?.parent?.snapshot.params['id'], [Validators.required]),
    name_i18n: new FormControl(null, [Validators.required]),
    description_i18n: new FormControl(null),
    intro_i18n: new FormControl(null),
    dateStart: new FormControl(null),
    dateEnd: new FormControl(null),
    isActive: new FormControl(true, [Validators.required]),
    mainImageUrls: new FormControl([]),
    headerImageUrls: new FormControl([]),
    previewImageUrls: new FormControl([]),
    productLinkIds: new FormControl([]),
  });

  filterForm: Type<DynamicFilterFormComponent> = SelectProductLinkFilterFormComponent;
  clearSelections: Symbol | null = null;
  openPanel: boolean = false;
  reloadPage: symbol | undefined;
  filterForItems!: Pick<ProductRecommendationItemEntity, 'storeProductRecommendationId'>;

  customImportParams: any;

  fields: CrudFields<ProductRecommendationItemEntity> = ['id', 'productLinkId', 'storeProductRecommendationId'];
  join: string[] = [
    'storeProductRecommendation',
    'productLink',
    'productLink.product',
    'productLink.product.productBrand',
    'productLink.product.category',
    'productLink.product.subcategory',
    'productLink.product.productUnit',
  ];

  config: CrudConfig = {
    title: 'Products',
    plural: 'Products',
    single: 'Product',
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    formWidth: 800,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<ProductRecommendationItemEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductRecommendationItemEntity): EntityValue {
        return item.productLink?.product?.imageUrls ? item.productLink?.product.imageUrls[0] : '';
      },
      type: 'image',
    },
    {
      label: 'Name',
      isSortable: false,
      getField(item: ProductRecommendationItemEntity): EntityValue {
        return `${item.productLink?.product?.name_i18n} \n Barcode (EAN) ${item.productLink?.product?.ean}`;
      },
      type: 'link',
      link(item: ProductRecommendationItemEntity): string {
        return `./${item.id}`;
      },
    },
    {
      label: 'Brand',
      isSortable: false,
      getField(item: ProductRecommendationItemEntity): EntityValue {
        return item.productLink?.product?.productBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Category',
      isSortable: false,
      getField(item: ProductRecommendationItemEntity): EntityValue {
        return item.productLink?.product?.category?.name_i18n ?? '';
      },
      type: 'text',
    },
    {
      label: 'Sub-category',
      isSortable: false,
      getField(item: ProductRecommendationItemEntity): EntityValue {
        return item.productLink?.product?.subcategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Measurement',
      isSortable: false,
      getField(item: ProductRecommendationItemEntity): EntityValue {
        return [item.productLink?.product?.productMeasurement, `${item.productLink?.product?.productUnit?.name_i18n}`].join('/');
      },
      type: 'text',
    },
  ];

  constructor(
    private readonly fb: FormBuilder,
    public readonly crudStoreProductRecommendationService: CrudProductRecommendationService,
    public readonly crudStoreProductRecommendationItemService: CrudProductRecommendationItemService,
    private readonly route: ActivatedRoute,
    private readonly notification: NzNotificationService,
  ) {
    super();
  }

  afterPatchValue(): void {
    this.onChangeMainImages();
    this.onChangeHeaderImages();
    this.onChangePreviewImages();
  }

  beforePatch(value: ProductRecommendationEntity): ProductRecommendationEntity {
    this.filterForItems = {
      storeProductRecommendationId: value.id,
    };
    return value;
  }

  linksSelected(productLinkIds: string[]): void {
    this.form.patchValue({ productLinkIds });
  }

  onUnSelectAllItems(): void {
    this.clearSelections = Symbol('clear');
  }

  update(): void {
    const id: string | undefined | null = this.form.get('id')?.value;

    if (id) {
      const input: StoreProductRecommendationUpdateInput = this.form.value as StoreProductRecommendationUpdateInput;
      this.crudStoreProductRecommendationService.update(id, input).subscribe();
    }
  }

  onChangePanelStatus(status: boolean): void {
    this.openPanel = status;
    if (!status) {
      this.reloadPage = Symbol('reload');
    }
  }

  onChangeMainImages(): void {
    this.form
      .get('mainImageUrls')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: string[] | null | undefined) => {
        if (value) {
          this.updateImages(
            {
              mainImageUrls: value,
            },
            'Main Images',
          );
        }
      });
  }

  onChangeHeaderImages(): void {
    this.form
      .get('headerImageUrls')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: string[] | null | undefined) => {
        if (value) {
          this.updateImages(
            {
              headerImageUrls: value,
            },
            'Header Images',
          );
        }
      });
  }

  onChangePreviewImages(): void {
    this.form
      .get('previewImageUrls')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: string[] | null | undefined) => {
        if (value) {
          this.updateImages(
            {
              previewImageUrls: value,
            },
            'Preview Images',
          );
        }
      });
  }

  updateImages(
    input: Pick<StoreProductRecommendationUpdateInput, 'mainImageUrls' | 'headerImageUrls' | 'previewImageUrls'>,
    notificationName: string,
  ): void {
    const id: string | null = this.form.getRawValue().id;

    if (id) {
      this.crudStoreProductRecommendationService.update(id, input).subscribe(() => {
        this.notification.success(notificationName, `Successfully saved.`, {
          nzPlacement: 'bottomLeft',
        });
      });
    }
  }
}

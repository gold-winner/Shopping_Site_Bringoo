import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CrudProductLinkService } from '../../../../../../../../shared/api/auth/crud-product-link.service';
import { ProductLinkEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import {
  PRODUCT_LINK_TABLE_FIELDS,
  PRODUCT_LINK_TABLE_JOIN,
  ProductLinkTableColumns,
} from '../../../../../../../../shared/config/product-link-table.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreProductLinkFilterFormComponent } from '../store-product-link-filter-form/store-product-link-filter-form.component';

@Component({
  selector: 'app-store-product-link-crud',
  templateUrl: './store-product-link-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = StoreProductLinkFilterFormComponent;
  openPanel: boolean = false;

  reloadPage: symbol | undefined;

  onChangePanelStatus(status: boolean): void {
    this.openPanel = status;
    if (!status) {
      this.reloadPage = Symbol('reload');
    }
  }

  nameLink?: string;
  storeId: string | undefined;

  fields: CrudFields<ProductLinkEntity> = PRODUCT_LINK_TABLE_FIELDS;
  join: string[] = PRODUCT_LINK_TABLE_JOIN;
  customImportParams: any;

  config: CrudConfig = {
    title: 'Product Link',
    plural: 'Product Links',
    single: 'Product Link',
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    formWidth: 800,
    onCreate: (input: any): Observable<ProductLinkEntity[]> => {
      return this.service.createMultiple(input);
    },
    actionsList: [
      {
        label: 'Create product link',
        action: (): void => {
          this.onChangePanelStatus(true);
        },
      },
    ],
  };

  columns!: CrudColumn<ProductLinkEntity>[];

  constructor(
    public readonly service: CrudProductLinkService,
    public readonly route: ActivatedRoute,
    public readonly storeDetailsService: StoreDetailsService,
  ) {
    this.storeId = this.route.snapshot.params['id'] || this.route.parent?.parent?.snapshot.params['id'];
    this.customImportParams = { storeId: this.storeId };
    this.setProductNameLink();
  }

  setProductNameLink(): void {
    const isStoreSetup: boolean = !this.route.snapshot.data.link;
    if (!isStoreSetup) {
      this.nameLink = `${this.route.snapshot.data.link}/${this.storeId}`;
    }
    this.columns = ProductLinkTableColumns(this.nameLink);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ProductsUpdateFormComponent } from '../../../app/products/modules/products/components/products-update-form/products-update-form.component';
import { CrudProductService } from '../../api/auth/crud-product.service';
import { CrudProductLinkService } from '../../api/auth/crud-product-link.service';
import { LangCodeEnum, ProductEntity, ProductLinkEntity, ProductUpdateInput, RouteEntity } from '../../api/auth/data-contracts';
import { DynamicForm } from '../../modules/crud/classes/dynamic-form.component';
import { DynamicFormInputs } from '../../modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../modules/crud/interfaces/dynamic-form-outputs';

@UntilDestroy()
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  @Input() set linkId(linkId: string | null) {
    if (linkId) {
      this.updateProductForm.onShowForm(linkId);
    }
  }

  productId!: string;

  openPanel: boolean = false;

  getFormValueSymbol?: symbol;

  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public productLinkService: CrudProductLinkService,
    public productService: CrudProductService,
    public nzNotificationService: NzNotificationService,
    private readonly ref: ChangeDetectorRef,
  ) {}

  getFormValue(): void {
    this.getFormValueSymbol = Symbol('get');
  }

  onCloseDrawer(): void {
    this.openPanel = false;
    this.submit.emit(false);
  }

  updateProductForm = {
    form: ProductsUpdateFormComponent as Type<DynamicForm<ProductUpdateInput>>,

    formInputs: {
      value: null,
    } as DynamicFormInputs,

    formOutputs: {
      formSubmit: (value: ProductUpdateInput): void => this.updateProductForm.update(value),
      formValueChanges: (value: RouteEntity): void => alert(value),
    } as DynamicFormOutputs,

    onShowForm: (linkId: string): void => {
      this.openPanel = true;
      this.updateProductForm.formInputs = { value: null, submit: undefined, show: Symbol('true') };

      this.updateProductForm.loadOne(linkId);
    },

    loadOne: (linkId: string): void => {
      this.productLinkService
        .findOne(linkId, { lang: LangCodeEnum.ALL, fields: 'productId' })
        .pipe(
          untilDestroyed(this),
          switchMap(
            ({ productId }: ProductLinkEntity & any): Observable<ProductEntity> => {
              this.productId = productId;
              return this.productService.findOne(productId, { lang: LangCodeEnum.ALL });
            },
          ),
          tap((value: ProductEntity) => {
            this.updateProductForm.formInputs = {
              value: { ...value, show: Symbol('true') },
            };
          }),
        )
        .subscribe(() => {
          this.ref.markForCheck();
        });
    },
    update: (value: ProductUpdateInput): void => {
      if (this.productId) {
        this.productService.update(this.productId, value).subscribe(
          () => this.submit.emit(true),
          (err: HttpErrorResponse) => {
            this.nzNotificationService.error('Error update product', err.message);
            this.onCloseDrawer();
          },
        );
      }
    },
  };
}

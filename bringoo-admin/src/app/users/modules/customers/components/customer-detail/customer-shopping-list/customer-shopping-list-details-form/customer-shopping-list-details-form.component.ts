import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { AppManagerShoppingListService } from '../../../../../../../../shared/api/auth/app-manager-shopping-list.service';
import { CrudShoppingListService } from '../../../../../../../../shared/api/auth/crud-shopping-list.service';
import { CrudShoppingListProductService } from '../../../../../../../../shared/api/auth/crud-shopping-list-product.service';
import { CartEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-shopping-list-details-form',
  templateUrl: './customer-shopping-list-details-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerShoppingDetailsFormComponent extends DynamicForm<any> {
  customFilters: any;
  listId: string | undefined;
  isListToCartButtonDisabled: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly crudShoppingListService: CrudShoppingListService,
    public readonly crudShoppingListProductService: CrudShoppingListProductService,
    private readonly appManagerShoppingListService: AppManagerShoppingListService,
  ) {
    super();
    this.buildForm();
  }

  onSetValue(value: any): any {
    if (value) {
      this.listId = value.id;
      this.customFilters = value.id ? { listId: value.id } : value;
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: { value: null },
      storeId: { value: null },
      customerId: { value: null },
      store: this.fb.group({
        name_i18n: { value: null },
      }),
    });
  }

  listToCart(): void {
    const customerId: string = this.route.snapshot.params['id'];

    if (this.listId && customerId) {
      this.isListToCartButtonDisabled = true;

      this.appManagerShoppingListService.createCartFromList({ listId: this.listId, customerId }).subscribe((cart: CartEntity) => {
        this.isListToCartButtonDisabled = false;

        if (cart?.id) {
          this.goToCartPage(cart.id);
        }
      });
    }
  }

  goToCartPage(cartId: string): void {
    this.router.navigate([`/orders/abandoned-shopping-cart/${cartId}`]);
  }
}

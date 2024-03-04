import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { CrudMolliePartnerService } from '../../../../../../shared/api/auth/crud-mollie-partner.service';
import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { MolliePartnerStoresUpdateInput, StoreEntity } from '../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-consultation-request-update-form',
  templateUrl: './partner-mollie-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerMollieUpdateFormComponent extends DynamicForm<MolliePartnerStoresUpdateInput> {
  storeSelect: SelectOptions<StoreEntity> = {
    service: this.crudStoreService,
    fields: ['name_i18n', 'id', 'code'],
    valueKey: 'id',
    getLabel(item: StoreEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(
    private fb: UntypedFormBuilder,
    public readonly service: CrudMolliePartnerService,
    public readonly crudStoreService: CrudStoreService,
  ) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      organizationId: [{ value: null, disabled: true }, [Validators.required]],
      name: [{ value: null, disabled: true }, [Validators.required]],
      email: [{ value: null, disabled: true }, [Validators.required]],
      storeIds: [null],
      stores: [null],
    });

    this.form.controls.stores.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        tap((stores: StoreEntity[]) => {
          stores && this.form.patchValue({ storeIds: stores.map((store: StoreEntity) => store.id) });
        }),
      )
      .subscribe();
  }

  beforeSubmit(value: any): MolliePartnerStoresUpdateInput {
    return { storeIds: value.storeIds };
  }
}

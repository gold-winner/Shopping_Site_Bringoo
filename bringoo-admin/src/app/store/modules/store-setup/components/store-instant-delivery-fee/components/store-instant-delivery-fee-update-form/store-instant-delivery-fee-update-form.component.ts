import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import { StoreDeliverySlotUpdateInput, StoreInstantDeliveryFeeUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { RemoveNotDirtyValues } from '../../../../../../../../shared/helpers/remove-not-dirty-values';
import { validationTime } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-delivery-fee-update-form',
  templateUrl: './store-instant-delivery-fee-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreInstantDeliveryFeeUpdateFormComponent extends DynamicForm<StoreInstantDeliveryFeeUpdateInput> {
  defaultFormValue: Partial<StoreInstantDeliveryFeeUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
  };

  zipCodesList$: Observable<string[]>;

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute, private crudStoreService: CrudStoreService) {
    super();
    this.buildForm();
    this.zipCodesList$ = crudStoreService.getZoneZipCodes(this.route.parent?.parent?.snapshot.params['id']);
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      zipCodes: [null, [Validators.required]],
      timeStart: [null, [Validators.required]],
      timeEnd: [null, [Validators.required, validationTime(() => this.form.get('timeStart')?.value)]],
      fee: [null, [Validators.required]],
    });
  }

  beforeSubmit(value: StoreDeliverySlotUpdateInput): StoreDeliverySlotUpdateInput {
    return RemoveNotDirtyValues(value, this.form);
  }
}

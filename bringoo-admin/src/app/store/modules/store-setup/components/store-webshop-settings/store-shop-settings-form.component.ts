import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { StoreEntity } from '../../../../../../shared/api/auth/data-contracts';
import { TIME_ZONES } from '../../../../../../shared/config/time-zones.config';
import { validateIf } from '../../../../../../shared/form validators/validate-if.validator';
import { SLUG_PATTERN } from '../../../../../../shared/helpers/slug-pattern';

@UntilDestroy()
@Component({
  selector: 'app-store-shop-settings-form',
  templateUrl: './store-shop-settings-form.component.html',
  styleUrls: ['store-shop-settings-form.component.scss'],
})
export class StoreShopSettingsFormComponent {
  form: UntypedFormGroup = this.fb.group({
    slug: [null, [Validators.pattern(SLUG_PATTERN), Validators.required, Validators.maxLength(400), Validators.minLength(3)]],
    replacementMaxTime: [600, [Validators.min(20), Validators.required]],
    replacementMaxAttempts: [10, [Validators.min(10), Validators.required]],
    timeZone: [null, [Validators.required]],
    replacementAllowed: [false, [Validators.required]],
    syncOrdersToPartner: [false, [Validators.required]],
    isNextDayDeliveryOnly: [null, [Validators.required]],
    nextDayDeliveryCutOffTime: [null, [validateIf('isNextDayDeliveryOnly')]],
    orderCantBeCanceledWhilePick: [null, [Validators.required]],
  });

  fields: string[] = [
    'slug',
    'replacementMaxTime',
    'replacementMaxAttempts',
    'timeZone',
    'replacementAllowed',
    'syncOrdersToPartner',
    'isNextDayDeliveryOnly',
    'nextDayDeliveryCutOffTime',
    'orderCantBeCanceledWhilePick',
  ];

  timeZones: string[] = TIME_ZONES;

  isLoading$: Observable<boolean> = this.service.isLoading$;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly service: CrudStoreService,
    private readonly activeRoute: ActivatedRoute,
    private readonly notification: NzNotificationService,
  ) {
    this.loadStoreInformation();
  }

  loadStoreInformation(): void {
    this.service
      .findOne(this.activeRoute.parent?.snapshot.params['id'], {
        fields: this.fields.join(','),
        softDelete: true,
      })
      .subscribe((store: StoreEntity) => {
        this.form.patchValue(store);
      });
  }

  onSubmit(): void {
    this.service.update(this.activeRoute.parent?.snapshot.params['id'], this.form.value).subscribe((entity: StoreEntity) => {
      this.form.patchValue(entity);
      this.notification.success('Shop Settings', 'Successfully updated');
    });
  }

  onCancel(): void {
    this.loadStoreInformation();
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format } from 'date-fns';

import { CrudStoreAddressService } from '../../../../../../../../shared/api/auth/crud-store-address.service';
import {
  LocationDto,
  Pageable,
  StoreAddressEntity,
  StoreDeliveryZoneCreateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-delivery-zone-create-form',
  templateUrl: './store-delivery-zone-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDeliveryZoneCreateFormComponent extends DynamicForm<StoreDeliveryZoneCreateInput> {
  defaultFormValue: Partial<StoreDeliveryZoneCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    deliveryTime: 45,
    isInstantDelivery: true,
    isPublicDisplay: true,
    zipCodes: [],
    dateStart: format(new Date(), DATE_FORMAT),
  };

  mapCenter: LocationDto | undefined = undefined;

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute, private readonly service: CrudStoreAddressService) {
    super();
    this.buildForm();
    this.getStoreLocationPosition();
  }

  getStoreLocationPosition(): void {
    this.service
      .find({
        s: JSON.stringify({
          storeId: this.defaultFormValue.storeId,
          addressType: 'MAIN',
        }),
      })
      .subscribe((res: Pageable & { items?: StoreAddressEntity[] }) => {
        const storeAddress: StoreAddressEntity | undefined = res.items?.find((item: StoreAddressEntity) => item.addressType === 'MAIN');
        if (storeAddress) {
          this.mapCenter = storeAddress.location;
        }
      });
  }

  updateZipCodesFromMap(zipCodes: string[]): void {
    this.form.patchValue({ zipCodes });
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      deliveryTime: [null, [Validators.required]],
      zipCodes: [null, [Validators.required]],
      defaultFee: [null, [Validators.required]],
      isPublicDisplay: [null],
      isInstantDelivery: [true, []],
    });
  }
}

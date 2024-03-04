import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudCountryService } from '../../../../../../../../shared/api/auth/crud-country.service';
import { CrudStoreAddressService } from '../../../../../../../../shared/api/auth/crud-store-address.service';
import {
  CountryEntity,
  LocationDto,
  Pageable,
  StoreAddressEntity,
  StoreDeliveryZoneUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-store-delivery-zone-update-form',
  templateUrl: './store-delivery-zone-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDeliveryZoneUpdateFormComponent extends DynamicForm<StoreDeliveryZoneUpdateInput> {
  defaultFormValue: Partial<StoreDeliveryZoneUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
  };

  requiredFields: string[] = ['storeId', 'zipCodes'];

  countrySelect: SelectOptions<CountryEntity> = {
    service: this.crudCountryService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: CountryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  mapCenter: LocationDto | undefined = undefined;

  defaultZipCodes: string[] | null = null;

  options?: google.maps.MapOptions;
  marketMarker?: google.maps.MarkerOptions;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crudCountryService: CrudCountryService,
    private readonly service: CrudStoreAddressService,
  ) {
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

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null],
      countryCode: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      deliveryTime: [null, [Validators.required]],
      zipCodes: [null, [Validators.required]],
      defaultFee: [null, [Validators.required]],
      isPublicDisplay: [null, []],
      isInstantDelivery: [null, []],
    });
  }

  updateZipCodesFromMap(zipCodes: string[]): void {
    this.form.patchValue({ zipCodes });
  }

  beforeSubmit(value: StoreDeliveryZoneUpdateInput): StoreDeliveryZoneUpdateInput {
    const formValues: StoreDeliveryZoneUpdateInput & any = value;

    let field: keyof typeof formValues;
    for (field in formValues) {
      if (!this.form.get(field)?.dirty && !this.requiredFields.includes(field)) delete formValues[field];
    }

    return formValues;
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter, pairwise, switchMap, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../../../shared/api/auth/crud-order.service';
import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import {
  KeyPointCreateInput,
  KeyPointTypeEnum,
  LocationDto,
  LocationInput,
  OrderEntity,
  RefuelTypeEnum,
  StoreAddressEntity,
  StoreEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { ORDER_CANCEL_STATUSES } from '../../../../../../../../shared/config/order-cancel-statuses.config';
import { validateIf } from '../../../../../../../../shared/form validators/validate-if.validator';
import { isNonNull } from '../../../../../../../../shared/helpers/is-non-null.helper';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { GoogleMapLoaderService } from '../../../../../../../../shared/services/google-map-loader.service';
import { FilterSearch } from '../../../../../../../../shared/types/crud-filters.types';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

type FormType = ToFormGroupType<KeyPointCreateInput>;

@UntilDestroy()
@Component({
  selector: 'app-create-key-point',
  templateUrl: 'assign-driver.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignDriverComponent extends DynamicForm<KeyPointCreateInput> {
  defaultFormValue: Partial<KeyPointCreateInput> = {
    pointType: KeyPointTypeEnum.DROP_OFF,
  };

  customOrderSelectFilters: FilterSearch<OrderEntity> = {
    // @ts-ignore
    'keyPoint.id': { $isnull: true },
  };

  pointTypes: string[] = Object.values(KeyPointTypeEnum);
  refuelTypes: string[] = Object.values(RefuelTypeEnum);
  dateTimeStart: string = '';
  dateTimeEnd: string = '';

  mapCenter: BehaviorSubject<LocationInput> = new BehaviorSubject<LocationInput>({ lat: 53.549369, lng: 9.999165 });

  markerOption: google.maps.MarkerOptions = {
    draggable: true,
  };

  isLoadedMap$: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  mapOptions: google.maps.MapOptions = {
    zoom: 12,
    disableDefaultUI: true,
  };

  orderSelect: SelectOptions<OrderEntity> = {
    service: this.orderService,
    fields: ['orderNumber', 'id'],
    sort: ['orderNumber,ASC'],
    valueKey: 'id',
    getLabel(item: OrderEntity): string {
      return item.orderNumber || '---';
    },
    filter: [`orderStatus||$notin||${[...ORDER_CANCEL_STATUSES.entries()].join(',')}`],
    search(term: string): string[] {
      return [['orderNumber', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||')];
    },
  };

  storeSelect: SelectOptions<StoreEntity> = {
    service: this.storeService,
    valueKey: 'id',
    sort: ['name_i18n,ASC'],
    fields: ['id', 'name_i18n', 'code'],
    filter: [`isActive||${CondOperator.EQUALS}||${true}`],
    getLabel(item: StoreEntity): string {
      return item.name_i18n || item.code || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  showStoreSelectWithStatus: typeof KeyPointTypeEnum.PICK_UP = KeyPointTypeEnum.PICK_UP;
  showOrderSelectWithStatus: typeof KeyPointTypeEnum.DROP_OFF = KeyPointTypeEnum.DROP_OFF;
  showRefuelSelectWithStatus: typeof KeyPointTypeEnum.MOBILITY_REFUEL = KeyPointTypeEnum.MOBILITY_REFUEL;

  addressNameControl: FormControl<string | null> = new FormControl<string | null>(null);

  form: FormGroup<FormType> = new FormGroup<FormType>({
    orderId: new FormControl(null),
    routeId: new FormControl(null),
    storeId: new FormControl(null),
    pointType: new FormControl(null, [Validators.required]),
    location: new FormGroup<ToFormGroupType<KeyPointCreateInput['location']>>({
      lng: new FormControl(null, [Validators.required]),
      lat: new FormControl(null, [Validators.required]),
    }),
    refuelType: new FormControl(null, validateIf('pointType', KeyPointTypeEnum.MOBILITY_REFUEL)),
  });

  constructor(
    private readonly orderService: CrudOrderService,
    private readonly storeService: CrudStoreService,
    private readonly googleMapLoaderService: GoogleMapLoaderService,
    private readonly geocoder: MapGeocoder,
  ) {
    super();
    this.changeOrderId();
    this.changeStoreId();
    this.changeRouteItemType();
    this.addressNameChanged();
  }

  set defaultFilters(filters: object & { dateTimeStart: string; dateTimeEnd: string }) {
    const routeId: string = (filters as Record<string, any>)['routeId'];
    this.dateTimeEnd = filters.dateTimeEnd;
    this.dateTimeStart = filters.dateTimeStart;
    this.form.patchValue({ routeId });
    super.defaultFilters = filters;
  }

  changeOrderId(): void {
    this.form
      .get('orderId')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        filter(isNonNull),
        switchMap((id: string) => {
          return this.orderService.findOne(id, {
            fields: 'id',
            join: ['orderDeliveryAddress||location'],
          });
        }),
        tap(({ orderDeliveryAddress }: OrderEntity) => {
          if (!orderDeliveryAddress?.location) return;
          this.setLocation(orderDeliveryAddress.location);
        }),
      )
      .subscribe();
  }

  changeStoreId(): void {
    this.form
      .get('storeId')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        filter(isNonNull),
        switchMap((id: string) => {
          return this.storeService.findOne(id, {
            join: ['addresses||location,addressType'],
          });
        }),
        tap(({ addresses }: StoreEntity) => {
          if (!addresses || addresses?.length === 0) return;
          const mainAddress: StoreAddressEntity =
            addresses.find(({ addressType }: StoreAddressEntity) => addressType === 'MAIN') ?? addresses[0];

          if (mainAddress.location) {
            this.setLocation(mainAddress.location);
          }
        }),
      )
      .subscribe();
  }

  setLocation(location: LocationDto): void {
    this.form.patchValue({ location });
    this.mapCenter.next(location);
  }

  changeRouteItemType(): void {
    this.form
      .get('routeItemType')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        pairwise(),
        tap(([prev]: [KeyPointTypeEnum, KeyPointTypeEnum]) => {
          if (!prev) return;

          switch (prev) {
            case KeyPointTypeEnum.BREAK_POINT: {
              this.form.patchValue({ orderId: null, storeId: null });
              break;
            }
            case this.showOrderSelectWithStatus: {
              this.form.patchValue({ orderId: null });
              break;
            }
            case this.showStoreSelectWithStatus: {
              this.form.patchValue({ orderId: null });
              break;
            }
            case this.showRefuelSelectWithStatus: {
              this.form.patchValue({ refuelType: null });
            }
          }
        }),
      )
      .subscribe();
  }

  addressNameChanged(): void {
    this.addressNameControl.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
        filter(isNonNull),
        switchMap((address: string) => {
          return this.geocoder.geocode({
            address,
          });
        }),
        tap((response: MapGeocoderResponse) => {
          const result: google.maps.GeocoderResult | null = response.results ? response.results[0] : null;
          if (result) {
            const location: LocationDto = result.geometry.location.toJSON();
            this.mapCenter.next(location);
            this.form.patchValue({ location });
          }
        }),
      )
      .subscribe();
  }

  onPositionChanged(marker: google.maps.MapMouseEvent): void {
    this.form.patchValue({ location: marker.latLng?.toJSON() });
    this.addressNameControl.patchValue(null);
  }

  onMapClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent): void {
    this.form.patchValue({ location: event.latLng?.toJSON() });
    this.addressNameControl.patchValue(null);
  }
}

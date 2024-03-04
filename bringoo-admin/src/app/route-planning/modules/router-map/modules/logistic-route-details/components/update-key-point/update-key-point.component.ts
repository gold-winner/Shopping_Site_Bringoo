import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, pairwise, switchMap, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../../../shared/api/auth/crud-order.service';
import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import {
  KeyPointTypeEnum,
  KeyPointUpdateInput,
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

type FormType = ToFormGroupType<Required<KeyPointUpdateInput>>;

@UntilDestroy()
@Component({
  selector: 'app-update-key-point',
  templateUrl: 'update-key-point.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateKeyPointComponent extends DynamicForm<KeyPointUpdateInput> {
  markerOption: google.maps.MarkerOptions = {
    draggable: true,
  };

  customOrderSelectFilters: FilterSearch<OrderEntity> = {
    // @ts-ignore
    'keyPoint.id': { $isnull: true },
  };

  showStoreSelectWithStatus: typeof KeyPointTypeEnum.PICK_UP = KeyPointTypeEnum.PICK_UP;
  showOrderSelectWithStatus: typeof KeyPointTypeEnum.DROP_OFF = KeyPointTypeEnum.DROP_OFF;
  showRefuelSelectWithStatus: typeof KeyPointTypeEnum.MOBILITY_REFUEL = KeyPointTypeEnum.MOBILITY_REFUEL;
  dateTimeEnd: string = '';
  dateTimeStart: string = '';

  defaultLocation!: LocationInput;
  mapCenter: BehaviorSubject<LocationInput> = new BehaviorSubject<LocationInput>({ lat: 53.549369, lng: 9.999165 });

  keyPointTypes: string[] = Object.values(KeyPointTypeEnum);
  refuelTypes: string[] = Object.values(RefuelTypeEnum);
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

  addressNameControl: FormControl<string | null> = new FormControl<string | null>(null);

  form: FormGroup<FormType> = new FormGroup<FormType>({
    orderId: new FormControl(null),
    routeId: new FormControl(null),
    storeId: new FormControl(null),
    pointType: new FormControl(null, [Validators.required]),
    location: new FormGroup<ToFormGroupType<LocationInput>>({
      lng: new FormControl(null, [Validators.required]),
      lat: new FormControl(null, [Validators.required]),
    }),
    refuelType: new FormControl(null, validateIf('pointType', KeyPointTypeEnum.MOBILITY_REFUEL)),
  });

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly googleMapLoaderService: GoogleMapLoaderService,
    private readonly orderService: CrudOrderService,
    private readonly storeService: CrudStoreService,
    private readonly geocoder: MapGeocoder,
  ) {
    super();
    this.addressNameChanged();
    this.changeOrderId();
    this.changeStoreId();
    this.changeRouteItemType();
  }

  beforePatch(value: KeyPointUpdateInput & { dateTimeStart: string; dateTimeEnd: string }): KeyPointUpdateInput {
    if (value.location) {
      this.defaultLocation = value.location;
      this.mapCenter.next(this.defaultLocation);
      this.form.patchValue({ location: value.location });
    }
    this.dateTimeEnd = value.dateTimeEnd;
    this.dateTimeStart = value.dateTimeStart;
    return super.beforePatch(value);
  }

  changeOrderId(): void {
    this.form
      .get('orderId')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        filter(isNonNull),
        switchMap(
          (id: string): Observable<OrderEntity> => {
            return this.orderService.findOne(id, {
              fields: 'id',
              join: ['orderDeliveryAddress||location'],
            });
          },
        ),
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

  changeRouteItemType(): void {
    this.form
      .get('routeItemType')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        distinctUntilChanged((x: any, y: any) => Boolean(x) && Boolean(y) && x !== y),
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

  setLocation(location: LocationDto): void {
    this.form.patchValue({ location });
    this.mapCenter.next(location);
  }

  onPositionChanged(marker: google.maps.MapMouseEvent): void {
    this.form.patchValue({ location: marker.latLng?.toJSON() });
  }

  undoLocation(): void {
    this.form.patchValue({ location: this.defaultLocation });
    this.mapCenter.next(this.defaultLocation);
    this.addressNameControl.patchValue(null);
  }
}

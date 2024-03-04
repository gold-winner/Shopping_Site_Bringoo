import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import cloneDeep from 'clone-deep';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { AppManagerStoreService } from '../../../../../../../shared/api/auth/app-manager-store.service';
import { CrudCustomerAddressService } from '../../../../../../../shared/api/auth/crud-customer-address.service';
import {
  CartEntity,
  CheckoutInput,
  CreateReservationInput,
  CustomerAddressEntity,
  CustomerEntity,
  DeliveryDestinationEnum,
  StoreSchedulerDayDto,
} from '../../../../../../../shared/api/auth/data-contracts';
import { isNonNull } from '../../../../../../../shared/helpers/is-non-null.helper';
import { requiredIfValidator } from '../../../../../../../shared/helpers/validate-form';
import { SelectOptions } from '../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../shared/modules/crud/enums/cond-operator';
import { DeliveryTimeSlot } from '../../../../../../../shared/types/delivety-time-slot.type';
import { ToFormGroupType } from '../../../../../../../shared/types/to-form-group.type';

enum DeliveryTypeEnum {
  instant = 'INSTANT',
  preorder = 'PREORDER',
}

type FormGroupType = ToFormGroupType<
  Omit<CheckoutInput, 'billingAddress' | 'deliveryAddress'> &
    Omit<CreateReservationInput, 'customerId'> & {
      deliveryType: DeliveryTypeEnum;
      deliveryAddressId: string;
      billingAddressId: string;
    }
>;

@UntilDestroy()
@Component({
  selector: 'app-abandoned-shopping-cart-checkout-form',
  templateUrl: './abandoned-shopping-cart-checkout-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbandonShoppingCartCheckoutFormComponent extends DynamicForm<CheckoutInput> {
  @Input() set cartDetails(cart: CartEntity) {
    this.cart$.next(cart);

    if (cart.customer) {
      this.customer = cart.customer;

      this.deliveryAddressSelect = {
        ...this.deliveryAddressSelect,
        filter: [`customerId||$eq||${this.customer.id}`],
      };

      this.billingAddressSelect = {
        ...this.billingAddressSelect,
        filter: [`customerId||$eq||${this.customer.id}`],
      };

      if (this.customer.settings?.phoneCountryCode) {
        this.form.patchValue({ phoneCountryCode: this.customer.settings?.phoneCountryCode });
      }

      if (this.customer.settings?.phoneNumber) {
        this.form.patchValue({ phoneNumber: this.customer.settings?.phoneNumber });
      }
    }

    this.form.patchValue({ deliveryType: DeliveryTypeEnum.instant });
  }

  deliveryDate: UntypedFormControl = new UntypedFormControl(null);

  DeliveryTypeEnum = DeliveryTypeEnum;
  customer: CustomerEntity | undefined;
  checkboxesClicked: Record<string, boolean> = {};
  deliveryDestinations: string[] = Object.values(DeliveryDestinationEnum);
  cart$: BehaviorSubject<CartEntity> = new BehaviorSubject<CartEntity>({} as CartEntity);
  deliveryAddress$: BehaviorSubject<CustomerAddressEntity> = new BehaviorSubject({} as CustomerAddressEntity);
  billingAddress$: BehaviorSubject<CustomerAddressEntity> = new BehaviorSubject({} as CustomerAddressEntity);

  deliveryAddressZipCode$: Observable<string> = this.deliveryAddress$.pipe(map(({ zipCode }: CustomerAddressEntity) => zipCode || ''));

  scheduleDays$: Observable<StoreSchedulerDayDto[]> = combineLatest([this.cart$, this.deliveryAddressZipCode$]).pipe(
    switchMap(([cart, zipCode]: [CartEntity, string]) =>
      cart?.storeId && zipCode ? this.appManagerStoreService.getTimeSlots(cart.storeId, { zipCode }) : of([]),
    ),
  );

  deliverySlots$: Observable<DeliveryTimeSlot[]> = this.scheduleDays$.pipe(
    map((scheduleDays: StoreSchedulerDayDto[]) => {
      const flatSlots: DeliveryTimeSlot[] = [];

      for (const { date, slots } of scheduleDays) {
        for (const { deliveryFee, time, available } of slots) {
          flatSlots.push({
            date,
            time,
            available,
            deliveryFee,
          });
        }
      }

      return flatSlots;
    }),
  );

  deliveryAddressSelect: SelectOptions<CustomerAddressEntity> = {
    service: this.customerAddressService,
    fields: ['id', 'addressName', 'addressType', 'city', 'customerId', 'apartmentNumber', 'streetName', 'streetNumber', 'organizationName'],
    valueKey: 'id',
    getLabel(item: CustomerAddressEntity): string {
      const address: string = [item.city || '', item.streetName || '', item.streetNumber || '', item.apartmentNumber || '']
        .filter(Boolean)
        .join(', ')
        .replace(/,,/g, ',');

      return address ? `${address}${item.organizationName ? `. Organization: ${item.organizationName}` : ''} (${item.addressName})` : '---';
    },
    search(term: string): string[] {
      return [['addressName', CondOperator.CONTAINS_LOW, term].join('||')];
    },
  };

  billingAddressSelect: SelectOptions<CustomerAddressEntity> = {
    service: this.customerAddressService,
    fields: ['id', 'addressName', 'addressType', 'city', 'customerId', 'streetName', 'streetNumber', 'apartmentNumber', 'organizationName'],
    valueKey: 'id',
    getLabel(item: CustomerAddressEntity): string {
      const address: string = [item.city || '', item.streetName || '', item.streetNumber || '', item.apartmentNumber || '']
        .filter(Boolean)
        .join(', ')
        .replace(/,,/g, ',');
      return address ? `${address}${item.organizationName ? `. Organization: ${item.organizationName}(${item.addressName})` : ''}` : '---';
    },
    search(term: string): string[] {
      return [['addressName', CondOperator.CONTAINS_LOW, term].join('||')];
    },
  };

  form: FormGroup<FormGroupType> = new FormGroup<FormGroupType>({
    deliveryAddressId: new FormControl(null, [Validators.required]),
    billingAddressId: new FormControl(null, [Validators.required]),
    phoneCountryCode: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    deliveryDestination: new FormControl(null, [Validators.required]),
    deliveryType: new FormControl(null, [Validators.required]),
    deliveryDate: new FormControl(null, [requiredIfValidator(() => this.form.get('deliveryType')?.value === DeliveryTypeEnum.preorder)]),
    deliveryComment: new FormControl(null),
    messageForShopper: new FormControl(null),
    deliveryDontRing: new FormControl(null),
    deliveryCallMe: new FormControl(null),
    deliveryLeaveAtTheDoor: new FormControl(null),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private readonly customerAddressService: CrudCustomerAddressService,
    private readonly appManagerStoreService: AppManagerStoreService,
  ) {
    super();
    this.buildForm();
    this.changeDeliveryDate();
    this.changeDeliveryAddress();
  }

  checkboxClick(key: string): void {
    this.checkboxesClicked[key] = true;
  }

  buildForm(): void {
    this.form.controls.deliveryType.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        filter(isNonNull),
        tap((deliveryType: DeliveryTypeEnum) => deliveryType === DeliveryTypeEnum.instant && this.form.patchValue({ deliveryDate: null })),
      )
      .subscribe();

    this.form.controls.deliveryAddressId.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        filter(isNonNull),
        tap((addressId: string) => !addressId && this.form.patchValue({ deliveryDate: null })),
        switchMap((addressId: string) => (addressId ? this.customerAddressService.findOne(addressId) : of({} as CustomerAddressEntity))),
        tap((address: CustomerAddressEntity) => this.deliveryAddress$.next(address)),
      )
      .subscribe();

    this.form.controls.billingAddressId.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        filter(isNonNull),
        switchMap((addressId: string) => (addressId ? this.customerAddressService.findOne(addressId) : of({} as CustomerAddressEntity))),
        tap((address: CustomerAddressEntity) => this.billingAddress$.next(address)),
      )
      .subscribe();
  }

  changeDeliveryDate(): void {
    this.deliveryDate.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.form.patchValue({ deliveryDate: null })),
      )
      .subscribe();
  }

  changeDeliveryAddress(): void {
    this.form
      .get('deliveryAddressId')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        tap(() => this.deliveryDate.patchValue(null)),
      )
      .subscribe();
  }

  beforeSubmit(value: any): any {
    const formValues: any = cloneDeep(value);

    return {
      ...formValues,
      deliveryAddress: this.deliveryAddress$.getValue(),
      billingAddress: this.billingAddress$.getValue(),
    };
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AppCustomer } from 'src/shared/api/app-customer';
import { GuestAuthenticationService } from 'src/shared/services/guest-authentication.service';

import {
  AddressTypeEnum,
  CustomerAddressDto,
  CustomerProfileDto,
  LanguageDto,
  ProfileUpdateInput,
} from '../../../../../shared/api/data-contracts';
import { PaymentMethodData, PaymentMethodEntity } from '../../../../example/components/cards/cards.mock';

@Component({
  selector: 'ui-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.scss'],
})
export class SettingsProfileComponent {
  cardAddressData: CustomerAddressDto[] = [];
  paymentMethodData = PaymentMethodData;
  addressModal: boolean = false;
  cardModal: boolean = false;
  deleteAccountModal: boolean = false;
  deleteAddressModal: string | undefined;
  deleteCardModal: string | undefined;
  isEditing: boolean = false;
  selectedAddress: string | undefined;
  selectedCard: string | undefined;
  isGuest: boolean = true;
  profile: CustomerProfileDto | undefined;
  status: boolean = false;
  langs: LanguageDto[] = [];
  zipCode: string = '';
  address: CustomerAddressDto | undefined;
  isSave: boolean = false;
  isEmailChanged: boolean = false;
  private notifier: NotifierService;

  constructor(
    public readonly appCustomer: AppCustomer,
    private readonly guestAuthenticationService: GuestAuthenticationService,
    private ref: ChangeDetectorRef,
    notifierService: NotifierService,
  ) {
    this.appCustomer.languages().subscribe(
      (res: LanguageDto[]) => {
        this.langs = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.notifier = notifierService;
    if (localStorage.getItem('customerAccessToken')) {
      this.isGuest = false;
    } else {
      this.isGuest = true;
    }
    this.appCustomer.profileGet().subscribe(
      (res: CustomerProfileDto) => {
        this.profile = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
    this.appCustomer.getAddresses(AddressTypeEnum.DELIVERY).subscribe(
      (res: CustomerAddressDto[]) => {
        this.cardAddressData = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 400) window.location.href = '/';
      },
    );
  }

  onClickConfirm(data: any): void {
    const profile_data: ProfileUpdateInput = {
      email: data.email,
      firstName: data.first,
      lastName: data.last,
      dateOfBirth: data.birth,
      phoneCountryCode: '',
      phoneNumber: data.telephone,
      // nationalityCode: '',
      customerLanguageCode: data.lang.toUpperCase(),
      inviteCode: '',
      salutation: undefined,
    };
    this.appCustomer.updateProfile(profile_data).subscribe(
      (res: CustomerProfileDto) => {
        this.profile = res;
        this.notifier.notify('info', 'Profile is successfully updated !');
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onConfirm(): void {
    this.appCustomer.deleteAccount().subscribe(
      (res: boolean) => {
        this.status = res;
        window.location.href = '/settings/profile';
      },
      (err: any) => {
        this.status = false;
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onEditEmail(): void {
    this.isEmailChanged = !this.isEmailChanged;
  }

  onDeleteAddressClick(data: any): void {
    this.zipCode = data.zip;
    this.deleteAddressModal = data.id;
  }

  onEditCardClick(address: CustomerAddressDto): void {
    this.addressModal = true;
    this.address = address;
    this.ref.detectChanges();
  }

  onDeleteAddress(): void {
    if (this.deleteAddressModal) {
      this.appCustomer.deleteAddress(this.deleteAddressModal).subscribe(
        (res: boolean) => {
          if (res) {
            this.cardAddressData = this.cardAddressData.filter((x: CustomerAddressDto) => {
              return x.zipCode !== this.zipCode;
            });
            this.deleteAddressModal = undefined;
          }
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 400) window.location.href = '/';
        },
      );
    }
  }

  onDeleteCardClick(cardNo: string): void {
    this.deleteCardModal = cardNo;
  }

  onSelectAddressClick(zipCode: string): void {
    this.cardAddressData.forEach((element: any) => {
      if (element.zipCode === zipCode) {
        element.isDefault = true;
      } else if (element.isDefault === true) {
        element.isDefault = false;
      }
    });
    this.ref.detectChanges();
  }

  onSelectCardClick(cardNo: string): void {
    this.paymentMethodData.forEach((element: PaymentMethodEntity) => {
      if (element.cardNo === cardNo) {
        element.isDefault = true;
      } else if (element.isDefault === true) {
        element.isDefault = false;
      }
    });
  }

  onDeleteCard(): void {
    this.paymentMethodData = this.paymentMethodData.filter((x: PaymentMethodEntity) => {
      return x.cardNo !== this.deleteCardModal;
    });
    this.deleteCardModal = undefined;
  }

  onSignout(): void {
    this.guestAuthenticationService.signOut();
  }

  onSignin(): void {
    window.location.href = '/login';
  }

  onAddAddress(): void {
    this.addressModal = true;
    this.address = undefined;
    this.ref.detectChanges();
  }

  onClickSave(data: any): void {
    if (data.mode === 'C') {
      delete data.mode;
      this.appCustomer.createAddress(data).subscribe(
        () => {
          this.appCustomer.getAddresses(AddressTypeEnum.DELIVERY).subscribe(
            (res: CustomerAddressDto[]) => {
              this.cardAddressData = res;
              this.addressModal = false;
              this.isSave = true;
              this.ref.detectChanges();
            },
            (err: any) => {
              this.notifier.notify('error', err);
            },
          );
          this.ref.detectChanges();
        },
        (err: any) => {
          this.notifier.notify('error', err);
        },
      );
    } else {
      const id: string = data.mode;
      delete data.mode;
      this.appCustomer.updateAddress(id, data).subscribe(
        () => {
          this.appCustomer.getAddresses(AddressTypeEnum.DELIVERY).subscribe(
            (res: CustomerAddressDto[]) => {
              this.cardAddressData = res;
              this.addressModal = false;
              this.isSave = true;
              this.ref.detectChanges();
            },
            (err: any) => {
              this.notifier.notify('error', err);
            },
          );
          this.ref.detectChanges();
        },
        (err: any) => {
          this.notifier.notify('error', err);
        },
      );
      this.ref.detectChanges();
    }
  }
}

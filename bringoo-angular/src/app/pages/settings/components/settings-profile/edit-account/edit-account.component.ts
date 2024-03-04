import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import { CustomerProfileDto, LanguageDto } from '../../../../../../shared/api/data-contracts';
import { IOption } from '../../../../../../shared/components/option';
@Component({
  selector: 'ui-settings-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class SettingsEditAccountComponent {
  selectedOption: string = 'en';
  options: IOption[] = [];
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  telephone: string = '';
  birth: string = '';
  loading: boolean = false;
  customer_no: string = '';
  private notifier: NotifierService;
  @Input() profile: CustomerProfileDto | undefined;
  @Input() langs: LanguageDto[] = [];
  @Output() onClickConfirm = new EventEmitter<any>();
  constructor(private ref: ChangeDetectorRef, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  onChangeOption(option: string): void {
    this.selectedOption = option;
  }

  onConfirm(): void {
    const data: any = {
      first: this.first_name,
      last: this.last_name,
      email: this.email,
      telephone: this.telephone,
      birth: this.birth,
      lang: this.selectedOption,
    };
    if (data.telephone.length < 5) {
      this.notifier.notify('error', 'Telephone number length should be at least 5 digit !');
      return;
    }
    this.loading = true;
    this.onClickConfirm.emit(data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.profile) {
      if (this.profile) {
        this.first_name = this.profile.firstName;
        this.last_name = this.profile.lastName;
        this.email = this.profile.email;
        this.telephone = this.profile.phoneNumber ? this.profile.phoneNumber : '';
        this.birth = this.profile.dateOfBirth ? this.profile.dateOfBirth : '';
        this.customer_no = this.profile.customerNumber ? this.profile.customerNumber : '';
        this.ref.detectChanges();
      }
    }
    if (changes.langs) {
      this.langs.map((item: LanguageDto, index: number) => {
        this.options[index] = {
          id: item.code.toLowerCase(),
          label: item.name_i18n,
        };
      });
      this.ref.detectChanges();
    }
  }
}

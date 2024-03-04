import { NgModule } from '@angular/core';

import { ArrayListComponent } from './array-list/array-list.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { CheckboxGroupFancyComponent } from './checkbox-group-fancy/checkbox-group-fancy.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { CurrencyCodeSelectComponent } from './currency-code-select/currency-code-select.component';
import { CustomerTagsSelect } from './customer-tags-select/customer-tags-select.component';
import { DateControlComponent } from './date-control/date-control.component';
import { DepositEditComponent } from './deposit-edit/deposit-edit.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FilterBrandSelectComponent } from './filter-brand-select/filter-brand-select.component';
import { FilterCategorySelectComponent } from './filter-category-select/filter-category-select.component';
import { FilterCorporateSelectComponent } from './filter-corporate-select/filter-corporate-select.component';
import { FilterCountrySelectComponent } from './filter-country-select/filter-country-select.component';
import { FilterListSelectComponent } from './filter-list-select/filter-list-select.component';
import { FilterProductLegalSelectComponent } from './filter-product-legal-select/filter-product-legal-select.component';
import { FilterProductSelectComponent } from './filter-product-select/filter-product-select.component';
import { FilterRecallReasonSelectComponent } from './filter-recall-reason-select/filter-recall-reason.component';
import { FilterRouteSelectComponent } from './filter-route-select/filter-route-select.component';
import { FilterStaffSelectComponent } from './filter-staff-select/filter-staff-select.component';
import { FilterStaffWithAvatarsComponent } from './filter-staff-with-avatars/filter-staff-with-avatars.component';
import { FilterStoreBrandSelectComponent } from './filter-store-brand-select/filter-store-brand-select.component';
import { FilterStoreCorporateSelectComponent } from './filter-store-corporate-select/filter-store-corporate-select.component';
import { FilterStoreRegionSelectComponent } from './filter-store-region-select/filter-store-region-select.component';
import { FilterStoreSelectComponent } from './filter-store-select/filter-store-select.component';
import { FilterStoreVendorCategorySelectComponent } from './filter-store-vendor-category-select/filter-store-vendor-category-select.component';
import { FilterSubcategorySelectComponent } from './filter-subcategory-select/filter-subcategory-select.component';
import { FilterVendorTypeSelectComponent } from './filter-vendor-type-select/filter-vendor-type-select.component';
import { JsonbOneToManyInputComponent } from './jsonb-one-to-many-input/jsonb-one-to-many-input.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { ListSelectComponent } from './list-select/list-select.component';
import { LoyaltyProgramSelectComponent } from './loyalty-program-select/loyalty-program-select.component';
import { ManagerRoleSelectComponent } from './manager-role-select/manager-role-select.component';
import { ManagerTypeAccountComponent } from './manager-type-account/manager-type-account.component';
import { MultiLangComponent } from './multi-lang/multi-lang-input.component';
import { MultiLangV2InputComponent } from './multi-lang-v2/multi-lang-v2-input.component';
import { NationalitySelectComponent } from './nationality-select/nationality-select.component';
import { NuntritionalDataEditComponent } from './nutritional-data-edit/nutritional-data-edit.component';
import { OrderSelectComponent } from './order-select/order-select.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { SelectComponent } from './select/select.component';
import { StatusSwitchComponent } from './status-switch/status-switch.component';
import { TimeControlComponent } from './time-control/time-control.component';
import { VatSelectComponent } from './vat-select/vat-select.component';
import { VendorTypeSelectComponent } from './vendor-type-code-select/vendor-type-select.component';

export const controls: Required<NgModule>['declarations'] = [
  ArrayListComponent,
  CheckboxGroupComponent,
  CheckboxGroupFancyComponent,
  CurrencyCodeSelectComponent,
  DateControlComponent,
  FileUploadComponent,
  FilterBrandSelectComponent,
  FilterCategorySelectComponent,
  FilterCorporateSelectComponent,
  FilterListSelectComponent,
  FilterStoreBrandSelectComponent,
  FilterCorporateSelectComponent,
  JsonbOneToManyInputComponent,
  FilterStoreRegionSelectComponent,
  FilterStoreSelectComponent,
  FilterSubcategorySelectComponent,
  FilterVendorTypeSelectComponent,
  FilterProductSelectComponent,
  FilterRecallReasonSelectComponent,
  ListSelectComponent,
  MultiLangComponent,
  MultiLangV2InputComponent,
  RadioGroupComponent,
  SelectComponent,
  StatusSwitchComponent,
  TimeControlComponent,
  VendorTypeSelectComponent,
  FilterCountrySelectComponent,
  LanguageSelectComponent,
  VatSelectComponent,
  ManagerRoleSelectComponent,
  ManagerTypeAccountComponent,
  FilterStoreCorporateSelectComponent,
  FilterStoreVendorCategorySelectComponent,
  FilterStaffSelectComponent,
  NationalitySelectComponent,
  CustomerTagsSelect,
  LoyaltyProgramSelectComponent,
  NuntritionalDataEditComponent,
  DepositEditComponent,
  FilterRouteSelectComponent,
  OrderSelectComponent,
  FilterProductLegalSelectComponent,
  ColorPickerComponent,
  FilterStaffWithAvatarsComponent,
];

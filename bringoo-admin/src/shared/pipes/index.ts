import { NgModule } from '@angular/core';

import { AbsPipe } from './abs.pipe';
import { ActualStoreOpeningHourPipe } from './actual-store-opening-hour.pipe';
import { AddressLocationPipe } from './address-location.pipe';
import { ArrayFindPipe } from './array-find.pipe';
import { ArrayJoinPipe } from './array-join.pipe';
import { ArrayObjectMapPipe } from './array-object-map.pipe';
import { BarChartToDataLabelsFormatPipe } from './bar-chart-to-data-labels-format.pipe';
import { BoolPipe } from './bool.pipe';
import { CalcPercentPipe } from './calc-percent.pipe';
import { CardsPipe } from './cards.pipe';
import { DateLocalPipe } from './date-local.pipe';
import { DelayTimePipe } from './delay-time.pipe';
import { DeliveryTimePipe } from './delivery-time.pipe';
import { FieldExistPipe } from './field-exist.pipe';
import { FormatDelayTimePipe } from './format-delay-time.pipe';
import { FormatDistancePipe } from './format-distance.pipe';
import { FormatPricePipe } from './format-price.pipe';
import { GetLocationPipe } from './get-location.pipe';
import { GetMarkerOptionPipe } from './get-marker-option.pipe';
import { GetOrderJobPipe } from './get-order-job.pipe';
import { GetStaffMarkerOptionPipe } from './get-staff-marker-option.pipe';
import { GramsToKgPipe } from './grams-to-kg.pipe';
import { ImageMiniaturePipe } from './image-miniature.pipe';
import { ImportErrorsPipe } from './import-errors.pipe';
import { ImportErrorsFieldsPipe } from './import-errors-fields.pipe';
import { IncludePipe } from './include.pipe';
import { FindJobTypePipe } from './job-type.pipe';
import { JobFindStaffPipe } from './jobs-filter.pipe';
import { LanguagePipe } from './language.pipe';
import { MarkTextPipe } from './mark-text.pipe';
import { ObjectValuePipe } from './object-value.pipe';
import { OrderWaitingTimePipe } from './order-waiting-time.pipe';
import { ReFormatPricePipe } from './reformat-price.pipe';
import { SortObjectsByDatePipe } from './sort-objects-by-date.pipe';
import { StoreAddressPipe } from './store-address.pipe';
import { StoreNamePipe } from './store-name.pipe';
import { StoreOpeningHoursPipe } from './store-opening-hours.pipe';
import { TableItemIndexPipe } from './table-item-index.pipe';

export const pipes: Required<NgModule>['declarations'] = [
  AbsPipe,
  AddressLocationPipe,
  ArrayFindPipe,
  BarChartToDataLabelsFormatPipe,
  BoolPipe,
  CalcPercentPipe,
  CardsPipe,
  DelayTimePipe,
  FindJobTypePipe,
  GetMarkerOptionPipe,
  GramsToKgPipe,
  ImportErrorsPipe,
  JobFindStaffPipe,
  LanguagePipe,
  ObjectValuePipe,
  SortObjectsByDatePipe,
  StoreAddressPipe,
  StoreOpeningHoursPipe,
  FormatPricePipe,
  TableItemIndexPipe,
  DateLocalPipe,
  ImageMiniaturePipe,
  GetStaffMarkerOptionPipe,
  ActualStoreOpeningHourPipe,
  FieldExistPipe,
  DeliveryTimePipe,
  GetOrderJobPipe,
  OrderWaitingTimePipe,
  GetLocationPipe,
  ImportErrorsFieldsPipe,
  ArrayJoinPipe,
  ArrayObjectMapPipe,
  MarkTextPipe,
  ReFormatPricePipe,
  FormatDistancePipe,
  FormatDelayTimePipe,
  IncludePipe,
  StoreNamePipe,
];

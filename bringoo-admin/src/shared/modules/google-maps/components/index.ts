import { NgModule } from '@angular/core';

import { MapComponent } from './map/map.component';
import { ZipCodePickerComponents } from './zip-code-picker/zip-code-picker.components';

export const components: Required<NgModule>['declarations'] = [ZipCodePickerComponents, MapComponent];

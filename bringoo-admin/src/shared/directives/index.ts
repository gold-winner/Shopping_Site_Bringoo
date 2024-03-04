import { NgModule } from '@angular/core';

import { CodeInputDirective } from './code-input.directive';
import { CodeSlugGenerate } from './code-slug-generate.directive';
import { DecimalNumberDirective } from './decimal-number.directive';
import { DisableControlDirective } from './disable-control';
import { DisableGroupDirective } from './disable-group';
import { FormControlValidationTipDirective } from './form-control-validation-tip.directive';
import { GoogleSearchInputDirective } from './google-search-input.directive';
import { IntegerNumberDirective } from './integer-number.directive';
import { VarDirective } from './ng-var.directive';
import { PositiveNumberDirective } from './positive-number.directive';
import { SlugInputDirective } from './slug-input.directive';

export const directives: Required<NgModule>['declarations'] = [
  DisableControlDirective,
  DisableGroupDirective,
  CodeInputDirective,
  DecimalNumberDirective,
  GoogleSearchInputDirective,
  CodeSlugGenerate,
  FormControlValidationTipDirective,
  VarDirective,
  IntegerNumberDirective,
  PositiveNumberDirective,
  SlugInputDirective,
];

import { OutputsType } from 'ng-dynamic-component';

export interface DynamicFormOutputs<T = any> extends OutputsType {
  formSubmit?: (value: T) => void | undefined;
  formValueChanges?: (value: T) => void | undefined;
}

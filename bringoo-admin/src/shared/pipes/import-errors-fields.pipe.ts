import { Pipe, PipeTransform } from '@angular/core';

import { ImportErrorDto, InputError } from '../api/auth/data-contracts';

@Pipe({ name: 'importErrorsFields' })
export class ImportErrorsFieldsPipe implements PipeTransform {
  transform({ errors }: ImportErrorDto): string[] {
    return errors.map((err: InputError) => err.property);
  }
}

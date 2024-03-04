import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { CrudCustomerService } from '../../api/auth/crud-customer.service';
import { CustomerTagDto } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-tags-select',
  templateUrl: './customer-tags-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerTagsSelect),
      multi: true,
    },
  ],
})
export class CustomerTagsSelect extends CustomControlComponent implements OnInit {
  @Input() label: string = 'Customer Tags:';
  @Input() placeHolder: string = 'Tags';

  ngOnInit(): void {
    super.ngOnInit();
  }

  tags$: Observable<CustomerTagDto[]> = this.service.tags();

  constructor(private service: CrudCustomerService, protected readonly inj: Injector) {
    super(inj);
  }
}

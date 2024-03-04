import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudStaffService } from '../../../../../../../../shared/api/auth/crud-staff.service';

@UntilDestroy()
@Component({
  selector: 'app-select-receipt',
  templateUrl: './select-receipt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectReceiptComponent {
  @Input() openPanel: boolean = false;
  @Input() images: string[] = [];
  @Output() submit: EventEmitter<number | undefined> = new EventEmitter<number | undefined>();

  selectImageIndex: number = 0;

  onSubmit(): void {
    this.submit.emit(this.selectImageIndex);
  }

  onCloseDrawer(): void {
    this.submit.emit();
  }

  constructor(public readonly service: CrudStaffService) {}
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { CrudManagerService } from '../../../../../../../shared/api/auth/crud-manager.service';
import { ManagerEntity } from '../../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-manager-note',
  templateUrl: './managers-note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersNoteComponent {
  form: UntypedFormGroup = this.fb.group({
    note: [null],
  });

  @Input() set managerInfo(manager: ManagerEntity) {
    this.form.patchValue(manager);
  }

  @Input() set submit(v: symbol) {
    if (v !== undefined && v.toString() === Symbol('note').toString()) {
      this.onSubmit();
    }
  }

  @Output() updatePage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: UntypedFormBuilder, private service: CrudManagerService, private route: ActivatedRoute) {}

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      this.service
        .update(this.route.snapshot.params['id'], this.form.value)
        .pipe(take(1))
        .subscribe(() => {
          this.updatePage.emit();
        });
    }
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format, parse } from 'date-fns';
import { tap } from 'rxjs/operators';

import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import { StoreClosingDayUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-closing-days-update-form',
  templateUrl: './store-closing-days-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreClosingDaysUpdateFormComponent extends DynamicForm<StoreClosingDayUpdateInput> {
  defaultFormValue: Partial<StoreClosingDayUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
  };

  dateRange: UntypedFormControl = new UntypedFormControl(null, [Validators.required, Validators.minLength(2)]);

  beforePatch(value: StoreClosingDayUpdateInput): StoreClosingDayUpdateInput {
    this.dateRange.patchValue([parse(value.dateStart, 'yyyy-MM-dd', new Date()), parse(value.dateEnd, 'yyyy-MM-dd', new Date())]);
    return value;
  }

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute, private crudStoreService: CrudStoreService) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      note: [null],
    });

    this.dateRange.valueChanges
      .pipe(
        untilDestroyed(this),
        tap((dates: Date[]) => {
          const patch: { dateStart: string | null; dateEnd: string | null } =
            dates.length > 0
              ? { dateStart: format(dates[0], DATE_FORMAT), dateEnd: format(dates[1], DATE_FORMAT) }
              : { dateStart: null, dateEnd: null };
          this.form.patchValue(patch);
        }),
      )
      .subscribe();
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map, tap } from 'rxjs/operators';

import { CrudTermsConditionService } from '../../../../../../../../shared/api/auth/crud-terms-condition.service';
import {
  LangCodeEnum,
  Pageable,
  TermsConditionCreateInput,
  TermsConditionEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-terms-condition-form-update',
  templateUrl: './terms-condition-form-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsConditionFormUpdateComponent extends DynamicForm<TermsConditionCreateInput> {
  parentId: string = '';
  isShowDeleted: boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly service: CrudTermsConditionService,
    private readonly ref: ChangeDetectorRef,
    private readonly notificationService: NzNotificationService,
  ) {
    super();
    this.buildForm();
  }

  beforePatch(value: TermsConditionCreateInput): TermsConditionCreateInput {
    if (value.id) {
      this.parentId = value.id;
      this.loadChildren();
    }

    return value;
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [undefined, []],
      isActive: [null, [Validators.required]],
      code: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      children: this.fb.array([]),
    });
  }

  get children(): UntypedFormArray {
    return this.form.get('children') as UntypedFormArray;
  }

  private createFormGroup(): UntypedFormGroup {
    return this.fb.group({
      id: [null],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      isActive: [null, [Validators.required]],
      code: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      deleted_date: [null],
      order: [null],
    });
  }

  loadChildren(): void {
    this.service
      .find({
        lang: LangCodeEnum.ALL,
        limit: 100,
        s: JSON.stringify({
          parentId: this.parentId,
        }),
        ...(this.isShowDeleted && { softDelete: this.isShowDeleted }),
        sort: ['order,ASC'],
      })
      .pipe(
        map((result: Pageable & { items?: TermsConditionEntity[] }): TermsConditionEntity[] => result.items ?? []),
        tap((items: TermsConditionEntity[]) => {
          this.children.clear();
          for (const item of items) {
            const formGroup: UntypedFormGroup = this.createFormGroup();
            formGroup.patchValue(item);
            this.children.push(formGroup);
          }
          this.ref.markForCheck();
        }),
      )
      .subscribe();
  }

  onShowDeleted(status: boolean): void {
    this.isShowDeleted = status;
    this.loadChildren();
  }

  onRecoverItem(id: string): void {
    this.service.recover(id).subscribe(() => {
      this.notificationService.success('Recover subparagraphs', 'Successfully recovered.');
      this.loadChildren();
    });
  }

  onDeleteItem(id: string): void {
    this.service.delete(id).subscribe(() => {
      this.notificationService.success('Delete subparagraphs', 'Successfully deleted.');
      this.loadChildren();
    });
  }

  draggedEnd([sourceId, targetId]: [string, string]): void {
    if (sourceId && targetId && sourceId !== targetId) {
      this.service
        .changeOrder({ sourceId, targetId })
        .pipe(tap(() => this.loadChildren()))
        .subscribe();
    }
  }
}

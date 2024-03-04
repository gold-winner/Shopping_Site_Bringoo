import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { TermsConditionChildCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { validateForm } from '../../../../../../../../shared/helpers/validate-form';
import { AppLanguageService } from '../../../../../../../../shared/services/app-language.service';
import { LanguagesService } from '../../../../../../../../shared/services/languages.service';

@Component({
  selector: 'app-terms-condition-form-subparagraphs',
  templateUrl: 'terms-condition-form-subparagraphs.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TermsConditionFormSubparagraphsComponent implements OnInit {
  @Input() set form(form: UntypedFormGroup) {
    this.formArray = form.get('children') as UntypedFormArray;
  }

  @Input() isUpdateForm: boolean = false;
  @Input() isShowDeleted: boolean = false;

  formArray!: UntypedFormArray;

  modalForm!: UntypedFormGroup;
  defaultModalFormValue!: Partial<TermsConditionChildCreateInput>;
  showModal: boolean = false;

  setOfEditedIds: Set<number> = new Set<number>();

  languages: string[] = [];
  selectedLang: UntypedFormControl = new UntypedFormControl();

  draggedItemIndex!: number;
  draggedDropIndex!: number;

  private _dateStart: string = '';
  @Input() set dateStart(dateStart: string) {
    if (!dateStart) return;

    this._dateStart = dateStart;
    this.setDateForItems('dateStart', dateStart);
  }

  private _dateEnd: string = '';
  @Input() set dateEnd(dateEnd: string) {
    if (!dateEnd) return;

    this._dateEnd = dateEnd;
    this.setDateForItems('dateEnd', dateEnd);
  }

  @Output() showDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() recoverItemId: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteItemId: EventEmitter<string> = new EventEmitter<string>();
  @Output() draggedEnd: EventEmitter<[string, string]> = new EventEmitter<[string, string]>();

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly langService: LanguagesService,
    private readonly appLanguageService: AppLanguageService,
  ) {}

  ngOnInit(): void {
    this.buildModalForm();
    this.loadLanguages();
  }

  buildModalForm(): void {
    this.modalForm = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      isActive: [true, [Validators.required]],
      code: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
    });
    this.defaultModalFormValue = { ...this.modalForm.value };
  }

  loadLanguages(): void {
    this.langService.languages$.subscribe((languages: string[]) => {
      this.languages = languages;
      this.selectedLang.patchValue(this.appLanguageService.language);
    });
  }

  get formGroups(): UntypedFormGroup[] {
    return this.formArray.controls as UntypedFormGroup[];
  }

  private createFormGroup(): UntypedFormGroup {
    return this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      isActive: [null, [Validators.required]],
      code: [null, [Validators.required]],
      dateStart: [this._dateStart, [Validators.required]],
      dateEnd: [this._dateEnd, [Validators.required]],
    });
  }

  setDateForItems(fieldName: string, value: string): void {
    if (!this.formArray) return;

    for (const item of this.formArray.controls) {
      item.patchValue({ [fieldName]: value });
    }
  }

  onShowModal(): void {
    this.resetDataForModalWindow();
    this.showModal = true;
  }

  resetDataForModalWindow(): void {
    this.modalForm.patchValue({
      ...this.defaultModalFormValue,
      dateStart: this._dateStart,
      dateEnd: this._dateEnd,
    });
  }

  onCloseModal(): void {
    this.showModal = false;
  }

  onCreateItem(): void {
    const createdFormGroup: UntypedFormGroup = this.createFormGroup();
    validateForm(this.modalForm);

    if (this.modalForm.invalid) return;

    createdFormGroup.patchValue(this.modalForm.value);
    this.formArray.push(createdFormGroup);

    this.onCloseModal();
  }

  onDeleteItem(index: number): void {
    const id: string = this.formArray.at(index)?.value?.id;
    if (id) {
      this.deleteItemId.emit(id);
    } else {
      this.formArray.removeAt(index);
    }
  }

  onEditItem(index: number): void {
    this.setOfEditedIds.add(index);
  }

  onCloseItem(index: number): void {
    this.setOfEditedIds.delete(index);
  }

  onRecover(index: number): void {
    const id: string = this.formArray.at(index).value.id;
    if (id) {
      this.recoverItemId.emit(id);
    }
  }

  onIsShowDeleted(status: boolean): void {
    this.showDeleted.emit(status);
  }

  onStartDrag(index: number): void {
    this.draggedItemIndex = index;
  }

  onSortPredicate = (index: number): boolean => {
    this.draggedDropIndex = index;
    return false;
  };

  onDrop(): void {
    const [sourceId, targetId] = [this.formArray.at(this.draggedItemIndex).value.id, this.formArray.at(this.draggedDropIndex).value.id];

    if (sourceId !== targetId) {
      this.draggedEnd.emit([sourceId, targetId]);
    }
  }
}

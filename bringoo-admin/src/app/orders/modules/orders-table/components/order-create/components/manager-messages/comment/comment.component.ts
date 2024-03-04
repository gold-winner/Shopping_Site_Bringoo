import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IndexList, ToolbarItemOptions } from '@toast-ui/editor/types/ui';
import { Subject } from 'rxjs';

import { CrudOrderManagerMessageService } from '../../../../../../../../../shared/api/auth/crud-order-manager-message.service';
import { OrderManagerMessageEntity } from '../../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../../shared/config/constants.config';
import { validateForm } from '../../../../../../../../../shared/helpers/validate-form';
import { CreateEyeIconsForMarkdownEditorHelper } from '../../../../../helper/create-eye-icons-for-markdown-editor.helper';

@Component({
  selector: 'app-order-manager-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() isCurrentUserMessage!: boolean;
  @Input() messageEntity!: OrderManagerMessageEntity;
  @Input() tz: string = 'UTC';
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();
  dateTimeFormat: string = DATE_TIME_FORMAT;

  isHiddenForStaffTooltipText: string = `Not viewable by Staff`;
  isShowedForStaffTooltipText: string = `Viewable by Staff`;

  eyeIcon!: SVGElement;
  eyeInvisible!: SVGElement;

  isEdited: Subject<boolean> = new Subject<boolean>();
  addToolbarItems!: { index: IndexList; item: ToolbarItemOptions }[];

  form: UntypedFormGroup = this.fb.group({
    isActive: [true, [Validators.required]],
    message: [null, [Validators.required, Validators.minLength(1)]],
    isHideForStaff: [false, [Validators.required]],
  });

  constructor(private readonly fb: UntypedFormBuilder, private readonly orderManagerMessages: CrudOrderManagerMessageService) {}

  getAddItems(): { index: IndexList; item: ToolbarItemOptions } {
    return {
      index: {
        groupIndex: 5,
        itemIndex: 0,
      },
      item: {
        name: 'Hide For Staff',
        tooltip: 'Viewed for Staff?',
        el: this.createHideStaffIconButton(),
      },
    };
  }

  onDelete(): void {
    this.orderManagerMessages.delete(this.messageEntity.id).subscribe(() => this.reload.emit());
  }

  onEdit(): void {
    this.form.patchValue(this.messageEntity);
    this.beforeShowEditForm();
    this.isEdited.next(true);
  }

  onCancel(): void {
    this.isEdited.next(false);
  }

  onSave(): void {
    validateForm(this.form);

    if (this.form.valid) {
      this.orderManagerMessages.update(this.messageEntity.id, this.form.value).subscribe(() => {
        this.isEdited.next(false);
        this.reload.emit();
      });
    }
  }

  createHideStaffIconButton(): HTMLElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.className = 'toastui-editor-toolbar-icons markdown-editor-toolbar-custom-icon';
    button.style.backgroundImage = 'none';
    button.style.margin = '0';
    button.style.padding = '4px';

    this.changeButtonIcon(button, this.form.value.isHideForStaff);

    button.addEventListener('click', () => {
      const isHideForStaff: boolean = !this.form.value.isHideForStaff;
      this.form.patchValue({ isHideForStaff });
      this.changeButtonIcon(button, isHideForStaff);
    });

    return button;
  }

  changeButtonIcon(button: HTMLButtonElement, status: boolean): void {
    if (status) {
      this.eyeIcon.remove();
      button.append(this.eyeInvisible);
    } else {
      this.eyeInvisible.remove();
      button.append(this.eyeIcon);
    }
  }

  beforeShowEditForm(): void {
    this.loadIcons();
    this.addToolbarItems = [this.getAddItems()];
  }

  loadIcons(): void {
    if (this.eyeInvisible || this.eyeIcon) return;

    const { eyeInvisible, eyeIcon } = CreateEyeIconsForMarkdownEditorHelper();

    this.eyeInvisible = eyeInvisible;
    this.eyeIcon = eyeIcon;
  }
}

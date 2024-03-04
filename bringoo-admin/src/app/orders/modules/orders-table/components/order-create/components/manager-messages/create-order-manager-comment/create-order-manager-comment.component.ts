import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IndexList, ToolbarItemOptions } from '@toast-ui/editor/types/ui';

import { CrudOrderManagerMessageService } from '../../../../../../../../../shared/api/auth/crud-order-manager-message.service';
import { OrderManagerMessageCreateInput } from '../../../../../../../../../shared/api/auth/data-contracts';
import { validateForm } from '../../../../../../../../../shared/helpers/validate-form';
import { CreateEyeIconsForMarkdownEditorHelper } from '../../../../../helper/create-eye-icons-for-markdown-editor.helper';

@Component({
  selector: 'app-create-order-manager-comment',
  templateUrl: 'create-order-manager-comment.component.html',
  styleUrls: ['create-order-manager-comment.component.scss'],
  host: { class: 'd-flex justify-content-start f-4' },
})
export class CreateOrderManagerComment {
  @Output() created: EventEmitter<void> = new EventEmitter<void>();
  @Input() orderId!: string;
  @Input() managerId!: string;

  form: UntypedFormGroup = this.fb.group({
    isActive: [true, [Validators.required]],
    message: [null, [Validators.required, Validators.minLength(1)]],
    isHideForStaff: [true, [Validators.required]],
  });

  eyeIcon!: SVGElement;
  eyeInvisible!: SVGElement;
  addToolbarItems!: { index: IndexList; item: ToolbarItemOptions }[];

  defaultValues: Partial<OrderManagerMessageCreateInput> = {
    message: '',
    isHideForStaff: true,
    isActive: true,
  };

  constructor(private readonly fb: UntypedFormBuilder, private readonly orderManagerMessages: CrudOrderManagerMessageService) {
    this.loadIcons();
    this.addToolbarItems = [this.getAddItems()];
  }

  loadIcons(): void {
    const { eyeInvisible, eyeIcon } = CreateEyeIconsForMarkdownEditorHelper();

    this.eyeInvisible = eyeInvisible;
    this.eyeIcon = eyeIcon;
  }

  createLastButton(): HTMLElement {
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

  getAddItems(): { index: IndexList; item: ToolbarItemOptions } {
    return {
      index: {
        groupIndex: 5,
        itemIndex: 0,
      },
      item: {
        name: 'Hide For Staff',
        tooltip: 'Viewed for Staff?',
        el: this.createLastButton(),
      },
    };
  }

  onSave(): void {
    validateForm(this.form);

    if (this.form.valid) {
      this.orderManagerMessages.create({ ...this.form.value, orderId: this.orderId, managerId: this.managerId }).subscribe(() => {
        this.created.emit();
        this.form.reset(this.defaultValues);
        this.form.controls.message.markAsPristine();
      });
    }
  }
}

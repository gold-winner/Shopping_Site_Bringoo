import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNode } from 'ng-zorro-antd/tree';

import { CrudCategoriesAndGroupsTemplateService } from '../../../../../../../../shared/api/auth/crud-categories-and-groups-template.service';

@Component({
  selector: 'app-store-category-and-group-save-template',
  templateUrl: 'store-category-and-group-save-template.html',
})
export class StoreCategoryAndGroupSaveTemplate {
  @Input() treeNode?: NzTreeNode[] = [];
  @Input() showModal: boolean = false;
  @Output() closePanel: EventEmitter<void> = new EventEmitter<void>();

  form: UntypedFormGroup = this.fb.group({
    name_i18n: [null, [Validators.required]],
    description_i18n: [null],
  });

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly service: CrudCategoriesAndGroupsTemplateService,
    private readonly notification: NzNotificationService,
  ) {}

  onSaveTemplate(): void {
    if (this.treeNode) {
      const subcategoryCodes: string[] = this.treeNode?.reduce((categories: string[], v: NzTreeNode) => {
        if (v.level === 0) {
          const newCategories: string[] = v.children.map((value: NzTreeNode) => value.key);
          return [...categories, ...newCategories];
        }
        return [...categories, v.key];
      }, []);

      if (this.form.valid) {
        this.service
          .create({
            ...this.form.value,
            isActive: true,
            subcategoryCodes,
          })
          .subscribe(() => {
            this.notification.success('Save Template.', 'Template successfully saved!');
            this.onClosePanel();
          });
      }
    }
  }

  onClosePanel(): void {
    this.closePanel.emit();
  }
}

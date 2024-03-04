import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { ImportDto } from '../../api/auth/data-contracts';

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportFormComponent {
  @Input() set startImport(s: symbol | undefined) {
    if (s) {
      this.onSubmit();
    } else {
      this.fileList = [];
    }
  }

  @Input() set response(r: ImportDto | null) {
    if (r) {
      this.importDto = r;
    }
  }

  @Output() formSubmit: EventEmitter<FormData> = new EventEmitter<FormData>();

  importDto: ImportDto | undefined;
  fileList: NzUploadFile[] = [];
  pageIndex: number = 1;

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [file];
    return false;
  };

  onSubmit(): void {
    this.importDto = undefined;

    if (this.fileList[0]) {
      const formData: FormData = new FormData();
      formData.append('file', this.fileList[0] as any);
      this.formSubmit.emit(formData);
    } else {
      this.fileList = [];
    }
  }

  getField(data: any, key: string): string {
    if (typeof data === 'object') {
      return key.includes('i18n') ? data?.EN : JSON.stringify(data);
    }
    return data;
  }
}

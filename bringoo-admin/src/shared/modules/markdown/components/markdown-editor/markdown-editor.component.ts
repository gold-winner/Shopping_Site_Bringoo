import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Editor } from '@toast-ui/editor';
import { HookCallback } from '@toast-ui/editor/types/editor';
import { IndexList, ToolbarItemOptions } from '@toast-ui/editor/types/ui';
import { tap } from 'rxjs/operators';

import { ImageDto } from '../../../../api/docs/data-contracts';
import { UploadService } from '../../../../api/docs/upload.service';
import { CustomControlComponent } from '../../../../classes/custom-control.component';
import { ThemeTypeEnum } from '../../../../enums/theme-type.enum';
import { ColorThemeService } from '../../../../services/color-theme.service';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: 'markdown-editor.component.html',
  styleUrls: [],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownEditorComponent),
      multi: true,
    },
  ],
})
export class MarkdownEditorComponent extends CustomControlComponent implements AfterViewInit {
  @ViewChild('editor_container') editorElement!: ElementRef<HTMLDivElement>;
  editor!: Editor;
  isFocus: boolean = false;
  initEditorValue: string = '';
  @Input() showButtons: boolean = false;
  @Input() addToolbarItems: { index: IndexList; item: ToolbarItemOptions }[] = [];

  @Input() set isOpen(focus: boolean) {
    this.isFocus = focus;
  }

  @Input() imageUrlPath: string = '';
  @Input() customHeight?: string;

  uiClassTheme: string = 'toastui-editor-dark';

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() clear(symbol: Symbol): void {
    if (symbol) {
      this.editor.setHTML('', true);
    }
  }

  constructor(
    private readonly uploadService: UploadService,
    private readonly colorThemeService: ColorThemeService,
    protected readonly inj: Injector,
  ) {
    super(inj);
    this.watchOnThemeChanges();
  }

  ngAfterViewInit(): void {
    this.editor = new Editor({
      el: this.editorElement.nativeElement,
      theme: this.colorThemeService.currentTheme,
      initialEditType: 'wysiwyg',
      initialValue: this.initEditorValue,
      ...(this.customHeight && { height: this.customHeight }),
      hooks: {
        addImageBlobHook: async (blob: File | Blob, callback: HookCallback): Promise<void> => {
          const formData: any = new FormData();
          formData.append('file', blob);
          formData.append('path', this.imageUrlPath);

          const { url }: ImageDto = await this.uploadService.uploadImage(formData).toPromise();
          callback(url, blob.type);
        },
      },
      events: {
        change: (): void => {
          if (this.control) {
            this.control.patchValue(this.editor.getMarkdown());
          }
        },
      },
    });

    for (const item of this.addToolbarItems) {
      this.editor.insertToolbarItem(item.index, item.item);
    }
  }

  watchOnThemeChanges(): void {
    this.colorThemeService.themeChange$.pipe(tap((theme: ThemeTypeEnum) => this.changeTheme(theme))).subscribe();
  }

  changeTheme(theme: ThemeTypeEnum): void {
    const editorUI: Element | null = this.editorElement?.nativeElement?.firstElementChild;
    if (!editorUI) return;

    if (theme === ThemeTypeEnum.dark) {
      editorUI.classList.add(this.uiClassTheme);
    } else {
      editorUI.classList.remove(this.uiClassTheme);
    }
  }

  writeValue(val: string): void {
    this.control.setValue(val, { emitModelToViewChange: true, emitViewToModelChange: true, emitEvent: true });
    this.initEditorValue = val ?? '';

    if (this.editor) {
      this.editor.setMarkdown(val ?? '', true);
    }
  }

  onFocus(): void {
    this.isFocus = true;
    this.editor.focus();
  }

  onSave(): void {
    this.save.emit();
  }

  onCancel(): void {
    this.editor.setHTML('', true);
    this.isFocus = false;
    this.cancel.emit();
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { tap } from 'rxjs/operators';

import { ThemeTypeEnum } from '../../../../enums/theme-type.enum';
import { ColorThemeService } from '../../../../services/color-theme.service';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: 'markdown-viewer.component.html',
  styleUrls: [],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownViewerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('view_container') viewContainer!: ElementRef<HTMLDivElement>;
  _mdString: string = '';
  @Input() set mdString(mdString: string) {
    this._mdString = mdString;
    if (this.viewer) {
      this.viewer.setMarkdown(mdString);
    }
  }

  constructor(private readonly colorThemeService: ColorThemeService) {
    this.watchOnThemeChanges();
  }

  viewer!: Viewer;
  uiClassTheme: string = 'toastui-editor-dark';

  ngAfterViewInit(): void {
    this.viewer = new Viewer({
      el: this.viewContainer.nativeElement,
      initialValue: this._mdString,
      theme: this.colorThemeService.currentTheme,
    });
  }

  watchOnThemeChanges(): void {
    this.colorThemeService.themeChange$.pipe(tap((theme: ThemeTypeEnum) => this.changeTheme(theme))).subscribe();
  }

  changeTheme(theme: ThemeTypeEnum): void {
    const editorUI: Element | null = this.viewContainer?.nativeElement;
    if (!editorUI) return;
    if (theme === ThemeTypeEnum.dark) {
      editorUI.classList.add(this.uiClassTheme);
    } else {
      editorUI.classList.remove(this.uiClassTheme);
    }
  }

  ngOnDestroy(): void {
    this.viewer.destroy();
  }
}

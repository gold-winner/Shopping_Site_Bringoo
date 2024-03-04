import { NgModule } from '@angular/core';

import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { MdMultiLangControllerComponent } from './md-multi-lang-controller/md-multi-lang-controller.component';

export const components: Required<NgModule>['declarations'] = [
  MarkdownEditorComponent,
  MarkdownViewerComponent,
  MdMultiLangControllerComponent,
];

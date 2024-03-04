import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-tags',
  templateUrl: './column-tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTagsComponent implements OnInit {
  @Input() tags: string[] = [];
  showAll: boolean = false;

  ngOnInit(): void {
    this.showAll = this.tags.length <= 7;
  }
}

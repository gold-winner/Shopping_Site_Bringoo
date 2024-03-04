import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() header!: string;
  @Input() data: Record<string, unknown> = {};
}

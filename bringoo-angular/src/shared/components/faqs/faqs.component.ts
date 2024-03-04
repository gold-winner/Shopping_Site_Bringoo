import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  expanded: boolean = false;

  onExpandFaq(): void {
    this.expanded = !this.expanded;
  }
}

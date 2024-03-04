import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() opened: boolean = false;
  @Input() primary: boolean = true;
  @Input() title: string = '';

  toggle(): void {
    this.opened = !this.opened;
  }
}

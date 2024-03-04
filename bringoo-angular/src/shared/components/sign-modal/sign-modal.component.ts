import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-sign-modal',
  templateUrl: './sign-modal.component.html',
  styleUrls: ['./sign-modal.component.scss'],
})
export class SignModalComponent {
  @Input() opened: any = null;
  @Input() smallSize: boolean = false;
  @Output() onClose = new EventEmitter<Event>();
}

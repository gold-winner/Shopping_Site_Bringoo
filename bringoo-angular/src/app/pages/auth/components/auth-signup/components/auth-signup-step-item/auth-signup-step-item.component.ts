import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-auth-signup-step-item',
  templateUrl: './auth-signup-step-item.component.html',
  styleUrls: ['./auth-signup-step-item.component.scss'],
})
export class AuthSignupStepItemComponent {
  @Input() step: number = 0;
  @Input() currentStep: number = 0;
  @Output() onStepClick = new EventEmitter<Event>();
  onClick(): void {
    // if (this.step < this.currentStep) {
    //   this.onStepClick.emit(event);
    // }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppCustomer } from 'src/shared/api/app-customer';
@Component({
  selector: 'ui-settings-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class SettingsDeleteAccountComponent {
  @Output() clickConfirm = new EventEmitter<Event>();
  value: string = '';
  status: boolean = true;
  constructor(public readonly appCustomer: AppCustomer, private ref: ChangeDetectorRef) {}

  onConfirm(): void {
    this.clickConfirm.emit();
  }
}

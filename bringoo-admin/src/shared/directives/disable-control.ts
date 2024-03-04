import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]',
})
export class DisableControlDirective implements OnInit {
  private _disabled: boolean = true;
  @Input() set disable(condition: boolean) {
    this._disabled = condition;
    this.onDisabled();
  }

  ngOnInit(): void {
    this.onDisabled();
  }

  onDisabled(): void {
    if (this.ngControl?.control) {
      const action: 'disable' | 'enable' = this._disabled ? 'disable' : 'enable';
      this.ngControl.control[action]();
    }
  }

  constructor(private readonly ngControl: NgControl) {}
}

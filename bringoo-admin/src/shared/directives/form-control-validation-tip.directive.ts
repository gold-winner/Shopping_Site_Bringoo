import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, Self, ViewContainerRef } from '@angular/core';
import { NzFormControlComponent } from 'ng-zorro-antd/form';

import { FormControlValidationTemplate } from '../templates/form-control-validation.template';

@Directive({
  selector: 'nz-form-control',
})
export class FormControlValidationTipDirective implements OnInit {
  @Input() labelForErrorTip: string = '';

  constructor(
    @Self() private formControl: NzFormControlComponent,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    const componentRef: ComponentRef<FormControlValidationTemplate> = this.getComponentRef();
    componentRef.instance.label = this.labelForErrorTip;
    this.formControl.nzErrorTip = componentRef.instance.errorTip;
  }

  private getComponentRef(): ComponentRef<FormControlValidationTemplate> {
    const factory: ComponentFactory<FormControlValidationTemplate> = this.resolver.resolveComponentFactory(FormControlValidationTemplate);
    return this.viewContainerRef.createComponent(factory);
  }
}

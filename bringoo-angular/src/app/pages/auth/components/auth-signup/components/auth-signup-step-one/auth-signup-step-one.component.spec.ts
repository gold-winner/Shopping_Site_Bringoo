import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupStepOneComponent } from './auth-signup-step-one.component';

describe('AuthSignupStepOneComponent', () => {
  let component: AuthSignupStepOneComponent;
  let fixture: ComponentFixture<AuthSignupStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthSignupStepOneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignupStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

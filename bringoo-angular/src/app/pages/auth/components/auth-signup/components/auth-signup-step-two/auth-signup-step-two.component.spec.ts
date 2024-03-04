import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupStepTwoComponent } from './auth-signup-step-two.component';

describe('AuthSignupStepTwoComponent', () => {
  let component: AuthSignupStepTwoComponent;
  let fixture: ComponentFixture<AuthSignupStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthSignupStepTwoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignupStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupStepThreeComponent } from './auth-signup-step-three.component';

describe('AuthSignupStepThreeComponent', () => {
  let component: AuthSignupStepThreeComponent;
  let fixture: ComponentFixture<AuthSignupStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthSignupStepThreeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignupStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

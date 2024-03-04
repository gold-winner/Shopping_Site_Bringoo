import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupStepItemComponent } from './auth-signup-step-item.component';

describe('AuthSignupStepItemComponent', () => {
  let component: AuthSignupStepItemComponent;
  let fixture: ComponentFixture<AuthSignupStepItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthSignupStepItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignupStepItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

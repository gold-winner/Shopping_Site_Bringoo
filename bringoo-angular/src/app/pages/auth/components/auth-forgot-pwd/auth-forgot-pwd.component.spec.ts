import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthForgotPwdComponent } from './auth-forgot-pwd.component';

describe('AuthForgotPwdComponent', () => {
  let component: AuthForgotPwdComponent;
  let fixture: ComponentFixture<AuthForgotPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthForgotPwdComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthForgotPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

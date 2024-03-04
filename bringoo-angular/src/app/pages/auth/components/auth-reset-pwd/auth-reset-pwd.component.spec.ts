import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResetPwdComponent } from './auth-reset-pwd.component';

describe('AuthResetPwdComponent', () => {
  let component: AuthResetPwdComponent;
  let fixture: ComponentFixture<AuthResetPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthResetPwdComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

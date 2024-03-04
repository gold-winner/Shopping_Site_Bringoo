import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPaymentComponent } from './landing-payment.component';

describe('LandingPaymentComponent', () => {
  let component: LandingPaymentComponent;
  let fixture: ComponentFixture<LandingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPaymentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

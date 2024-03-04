import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPartnershipComponent } from './landing-partnership.component';

describe('LandingPartnershipComponent', () => {
  let component: LandingPartnershipComponent;
  let fixture: ComponentFixture<LandingPartnershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPartnershipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

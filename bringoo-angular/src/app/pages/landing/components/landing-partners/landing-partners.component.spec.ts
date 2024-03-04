import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPartnersComponent } from './landing-partners.component';

describe('LandingPartnersComponent', () => {
  let component: LandingPartnersComponent;
  let fixture: ComponentFixture<LandingPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPartnersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

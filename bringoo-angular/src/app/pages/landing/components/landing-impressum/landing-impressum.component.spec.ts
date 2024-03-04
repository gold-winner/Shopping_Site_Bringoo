import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingImpressumComponent } from './landing-impressum.component';

describe('LandingWorkComponent', () => {
  let component: LandingImpressumComponent;
  let fixture: ComponentFixture<LandingImpressumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingImpressumComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingImpressumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

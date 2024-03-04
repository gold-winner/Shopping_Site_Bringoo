import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDatenschutzComponent } from './landing-datenschutz.component';

describe('LandingWorkComponent', () => {
  let component: LandingDatenschutzComponent;
  let fixture: ComponentFixture<LandingDatenschutzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingDatenschutzComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDatenschutzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

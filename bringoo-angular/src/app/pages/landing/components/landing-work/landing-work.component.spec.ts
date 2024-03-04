import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingWorkComponent } from './landing-work.component';

describe('LandingWorkComponent', () => {
  let component: LandingWorkComponent;
  let fixture: ComponentFixture<LandingWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingWorkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

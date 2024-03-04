import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStepComponent } from './card-step.component';

describe('CardStepComponent', () => {
  let component: CardStepComponent;
  let fixture: ComponentFixture<CardStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardStepComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

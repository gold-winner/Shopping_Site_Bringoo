import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecentlyComponent } from './card-recently.component';

describe('CardRecentlyComponent', () => {
  let component: CardRecentlyComponent;
  let fixture: ComponentFixture<CardRecentlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRecentlyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRecentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

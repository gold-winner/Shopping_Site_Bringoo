import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPopularComponent } from './card-popular.component';

describe('CardPopularComponent', () => {
  let component: CardPopularComponent;
  let fixture: ComponentFixture<CardPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPopularComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

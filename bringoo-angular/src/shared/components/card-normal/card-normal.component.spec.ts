import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNormalComponent } from './card-normal.component';

describe('CardNormalComponent', () => {
  let component: CardNormalComponent;
  let fixture: ComponentFixture<CardNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNormalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

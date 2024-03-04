import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAddCardComponent } from './add-card.component';

describe('SettingsAddCardComponent', () => {
  let component: SettingsAddCardComponent;
  let fixture: ComponentFixture<SettingsAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsAddCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

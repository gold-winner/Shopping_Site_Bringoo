import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeleteCardComponent } from './delete-card.component';

describe('SettingsDeleteCardComponent', () => {
  let component: SettingsDeleteCardComponent;
  let fixture: ComponentFixture<SettingsDeleteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDeleteCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDeleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

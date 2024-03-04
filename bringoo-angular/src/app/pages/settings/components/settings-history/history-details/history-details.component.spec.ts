import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHistoryDetailsComponent } from './history-details.component';

describe('SettingsHistoryDetailsComponent', () => {
  let component: SettingsHistoryDetailsComponent;
  let fixture: ComponentFixture<SettingsHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsHistoryDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

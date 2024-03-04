import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHistoryStatusComponent } from './history-status.component';

describe('OrderStatusComponent', () => {
  let component: SettingsHistoryStatusComponent;
  let fixture: ComponentFixture<SettingsHistoryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsHistoryStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsHistoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

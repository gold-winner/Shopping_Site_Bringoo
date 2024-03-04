import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOrderDetailsComponent } from './order-details.component';

describe('SettingsOrderDetailsComponent', () => {
  let component: SettingsOrderDetailsComponent;
  let fixture: ComponentFixture<SettingsOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsOrderDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOrderComponent } from './settings-order.component';

describe('SettingsOrderComponent', () => {
  let component: SettingsOrderComponent;
  let fixture: ComponentFixture<SettingsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsOrderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

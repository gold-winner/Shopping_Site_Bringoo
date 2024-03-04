import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditAccountComponent } from './edit-account.component';

describe('SettingsEditAccountComponent', () => {
  let component: SettingsEditAccountComponent;
  let fixture: ComponentFixture<SettingsEditAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsEditAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

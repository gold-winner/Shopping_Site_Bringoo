import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeleteAccountComponent } from './delete-account.component';

describe('SettingsDeleteAccountComponent', () => {
  let component: SettingsDeleteAccountComponent;
  let fixture: ComponentFixture<SettingsDeleteAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDeleteAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

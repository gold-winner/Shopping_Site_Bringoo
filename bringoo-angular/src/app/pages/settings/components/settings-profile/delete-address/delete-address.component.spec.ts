import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeleteAddressComponent } from './delete-address.component';

describe('SettingsDeleteAddressComponent', () => {
  let component: SettingsDeleteAddressComponent;
  let fixture: ComponentFixture<SettingsDeleteAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDeleteAddressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDeleteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

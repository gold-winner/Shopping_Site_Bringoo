import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAddAddressComponent } from './add-address.component';

describe('SettingsAddAddressComponent', () => {
  let component: SettingsAddAddressComponent;
  let fixture: ComponentFixture<SettingsAddAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsAddAddressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

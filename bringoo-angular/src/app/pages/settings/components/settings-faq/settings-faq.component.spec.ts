import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFaqComponent } from './settings-faq.component';

describe('SettingsFaqComponent', () => {
  let component: SettingsFaqComponent;
  let fixture: ComponentFixture<SettingsFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsFaqComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFavoriteComponent } from './settings-favorite.component';

describe('SettingsFavoriteComponent', () => {
  let component: SettingsFavoriteComponent;
  let fixture: ComponentFixture<SettingsFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsFavoriteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

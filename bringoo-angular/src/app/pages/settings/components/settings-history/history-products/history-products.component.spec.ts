import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHistoryProductsComponent } from './history-products.component';

describe('HistoryProductsComponent', () => {
  let component: SettingsHistoryProductsComponent;
  let fixture: ComponentFixture<SettingsHistoryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsHistoryProductsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsHistoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

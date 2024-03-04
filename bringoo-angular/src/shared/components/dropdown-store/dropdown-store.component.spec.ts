import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownStoreComponent } from './dropdown-store.component';

describe('DropdownStoreComponent', () => {
  let component: DropdownStoreComponent;
  let fixture: ComponentFixture<DropdownStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownStoreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

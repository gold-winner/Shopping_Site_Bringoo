import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategorySidebarComponent } from './subcategory-sidebar.component';

describe('SubCategorySidebarComponent', () => {
  let component: SubCategorySidebarComponent;
  let fixture: ComponentFixture<SubCategorySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCategorySidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

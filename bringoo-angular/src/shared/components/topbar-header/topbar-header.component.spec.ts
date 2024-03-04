import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarHeaderComponent } from './topbar-header.component';

describe('TopbarHeaderComponent', () => {
  let component: TopbarHeaderComponent;
  let fixture: ComponentFixture<TopbarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopbarHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

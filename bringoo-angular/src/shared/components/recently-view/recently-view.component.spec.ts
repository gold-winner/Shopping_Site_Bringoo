import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyViewComponent } from './recently-view.component';

describe('RecentlyViewComponent', () => {
  let component: RecentlyViewComponent;
  let fixture: ComponentFixture<RecentlyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentlyViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

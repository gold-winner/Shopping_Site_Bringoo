import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularViewComponent } from './popular-view.component';

describe('PopularViewComponent', () => {
  let component: PopularViewComponent;
  let fixture: ComponentFixture<PopularViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

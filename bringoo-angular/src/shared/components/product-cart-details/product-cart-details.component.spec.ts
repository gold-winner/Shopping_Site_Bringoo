import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartDetailsComponent } from './product-cart-details.component';

describe('ProductCartDetailsComponent', () => {
  let component: ProductCartDetailsComponent;
  let fixture: ComponentFixture<ProductCartDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCartDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

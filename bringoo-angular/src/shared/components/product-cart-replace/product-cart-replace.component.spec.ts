import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartReplaceComponent } from './product-cart-replace.component';

describe('ProductCartReplaceComponent', () => {
  let component: ProductCartReplaceComponent;
  let fixture: ComponentFixture<ProductCartReplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCartReplaceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

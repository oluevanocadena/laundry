import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsGeneralsComponent } from '@private/products/components/generals/products-generals.component';

describe('ProductsGeneralsComponent', () => {
  let fixture: ComponentFixture<ProductsGeneralsComponent>;
  let component: ProductsGeneralsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [ProductsGeneralsComponent],
    });

    fixture = TestBed.createComponent(ProductsGeneralsComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAvailabilityComponent } from '@private/products/components/availability/products-availability.component';

describe('ProductsAvailabilityComponent', () => {
  let fixture: ComponentFixture<ProductsAvailabilityComponent>;
  let component: ProductsAvailabilityComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [ProductsAvailabilityComponent],
    });

    fixture = TestBed.createComponent(ProductsAvailabilityComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});

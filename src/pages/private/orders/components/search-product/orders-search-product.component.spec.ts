import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSearchProductComponent } from '@private/orders/components/search-product/orders-search-product.component';

describe('OrdersSearchProductComponent', () => {
  let fixture: ComponentFixture<OrdersSearchProductComponent>;
  let component: OrdersSearchProductComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [OrdersSearchProductComponent],
    });

    fixture = TestBed.createComponent(OrdersSearchProductComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});

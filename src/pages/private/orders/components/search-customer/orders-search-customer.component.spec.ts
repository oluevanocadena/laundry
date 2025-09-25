import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSearchCustomerComponent } from '@private/orders/components/search-customer/orders-search-customer.component';

describe('OrdersSearchCustomerComponent', () => {
  let fixture: ComponentFixture<OrdersSearchCustomerComponent>;
  let component: OrdersSearchCustomerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [OrdersSearchCustomerComponent],
    });

    fixture = TestBed.createComponent(OrdersSearchCustomerComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});

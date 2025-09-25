import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCustomerComponent } from '@private/orders/components/customer/orders-customer.component';

describe('OrdersCustomerComponent', () => {
  let fixture: ComponentFixture<OrdersCustomerComponent>;
  let component: OrdersCustomerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [OrdersCustomerComponent],
    });

    fixture = TestBed.createComponent(OrdersCustomerComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});

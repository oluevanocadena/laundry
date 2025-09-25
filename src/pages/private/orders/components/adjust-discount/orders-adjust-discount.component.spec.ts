import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAdjustDiscountComponent } from '@private/orders/components/adjust-discount/orders-adjust-discount.component';

describe('OrdersAdjustDiscountComponent', () => {
  let fixture: ComponentFixture<OrdersAdjustDiscountComponent>;
  let component: OrdersAdjustDiscountComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [OrdersAdjustDiscountComponent],
    });

    fixture = TestBed.createComponent(OrdersAdjustDiscountComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});

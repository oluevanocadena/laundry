import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAdjustDeliveryComponent } from '@private/orders/components/adjust-delivery/orders-adjust-delivery.component';

describe('OrdersAdjustDeliveryComponent', () => {
  let fixture: ComponentFixture<OrdersAdjustDeliveryComponent>;
  let component: OrdersAdjustDeliveryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [OrdersAdjustDeliveryComponent],
    });

    fixture = TestBed.createComponent(OrdersAdjustDeliveryComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});

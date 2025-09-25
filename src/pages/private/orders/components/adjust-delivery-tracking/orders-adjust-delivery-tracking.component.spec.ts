import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OrdersAdjustDeliveryTrackingComponent } from "@private/orders/components/adjust-delivery-tracking/orders-adjust-delivery-tracking.component";

describe("OrdersAdjustDeliveryTrackingComponent", () => {

  let fixture: ComponentFixture<OrdersAdjustDeliveryTrackingComponent>;
  let component: OrdersAdjustDeliveryTrackingComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersAdjustDeliveryTrackingComponent]
    });

    fixture = TestBed.createComponent(OrdersAdjustDeliveryTrackingComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

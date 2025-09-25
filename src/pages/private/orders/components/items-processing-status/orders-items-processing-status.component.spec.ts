import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OrdersItemsProcessingStatusComponent } from "@private/orders/components/items-processing-status/orders-items-processing-status.component";

describe("OrdersItemsProcessingStatusComponent", () => {

  let fixture: ComponentFixture<OrdersItemsProcessingStatusComponent>;
  let component: OrdersItemsProcessingStatusComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersItemsProcessingStatusComponent]
    });

    fixture = TestBed.createComponent(OrdersItemsProcessingStatusComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

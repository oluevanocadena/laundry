import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OrdersItemsProcessingComponent } from "@private/orders/components/items-processing/orders-items-processing.component";

describe("OrdersItemsProcessingComponent", () => {

  let fixture: ComponentFixture<OrdersItemsProcessingComponent>;
  let component: OrdersItemsProcessingComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersItemsProcessingComponent]
    });

    fixture = TestBed.createComponent(OrdersItemsProcessingComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

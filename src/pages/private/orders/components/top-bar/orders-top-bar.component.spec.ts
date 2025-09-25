import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OrdersTopBarComponent } from "@private/orders/components/top-bar/orders-top-bar.component";

describe("OrdersTopBarComponent", () => {

  let fixture: ComponentFixture<OrdersTopBarComponent>;
  let component: OrdersTopBarComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersTopBarComponent]
    });

    fixture = TestBed.createComponent(OrdersTopBarComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

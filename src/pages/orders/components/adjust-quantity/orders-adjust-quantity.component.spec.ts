import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersAdjustQuantityComponent } from "./orders-adjust-quantity.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersAdjustQuantityComponent", () => {

  let fixture: ComponentFixture<OrdersAdjustQuantityComponent>;
  let component: OrdersAdjustQuantityComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersAdjustQuantityComponent]
    });

    fixture = TestBed.createComponent(OrdersAdjustQuantityComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

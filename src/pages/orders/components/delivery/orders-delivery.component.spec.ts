import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersDeliveryComponent } from "./orders-delivery.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersDeliveryComponent", () => {

  let fixture: ComponentFixture<OrdersDeliveryComponent>;
  let component: OrdersDeliveryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersDeliveryComponent]
    });

    fixture = TestBed.createComponent(OrdersDeliveryComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

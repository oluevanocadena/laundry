import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersCustomerComponent } from "./orders-customer.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersCustomerComponent", () => {

  let fixture: ComponentFixture<OrdersCustomerComponent>;
  let component: OrdersCustomerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersCustomerComponent]
    });

    fixture = TestBed.createComponent(OrdersCustomerComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

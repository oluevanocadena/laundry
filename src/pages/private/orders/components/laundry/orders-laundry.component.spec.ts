import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersLaundryComponent } from "./orders-laundry.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersLaundryComponent", () => {

  let fixture: ComponentFixture<OrdersLaundryComponent>;
  let component: OrdersLaundryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersLaundryComponent]
    });

    fixture = TestBed.createComponent(OrdersLaundryComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

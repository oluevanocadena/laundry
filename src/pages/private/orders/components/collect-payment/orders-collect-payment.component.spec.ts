import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersCollectPaymentComponent } from "./orders-collect-payment.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersCollectPaymentComponent", () => {

  let fixture: ComponentFixture<OrdersCollectPaymentComponent>;
  let component: OrdersCollectPaymentComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersCollectPaymentComponent]
    });

    fixture = TestBed.createComponent(OrdersCollectPaymentComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

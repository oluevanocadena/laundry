import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersItemPricingComponent } from "./orders-item-pricing.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersItemPricingComponent", () => {

  let fixture: ComponentFixture<OrdersItemPricingComponent>;
  let component: OrdersItemPricingComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersItemPricingComponent]
    });

    fixture = TestBed.createComponent(OrdersItemPricingComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersDetailPageComponent } from "./order-detail-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrderDetailPageComponent", () => {

  let fixture: ComponentFixture<OrdersDetailPageComponent>;
  let component: OrdersDetailPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersDetailPageComponent]
    });

    fixture = TestBed.createComponent(OrdersDetailPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

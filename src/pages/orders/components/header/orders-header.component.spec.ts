import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersHeaderComponent } from "./orders-header.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersHeaderComponent", () => {

  let fixture: ComponentFixture<OrdersHeaderComponent>;
  let component: OrdersHeaderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersHeaderComponent]
    });

    fixture = TestBed.createComponent(OrdersHeaderComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

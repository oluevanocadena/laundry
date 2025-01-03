import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersTopBarComponent } from "./orders-top-bar.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

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

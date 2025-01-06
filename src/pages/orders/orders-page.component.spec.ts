import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersPageComponent } from "./orders-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersPageComponent", () => {

  let fixture: ComponentFixture<OrdersPageComponent>;
  let component: OrdersPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersPageComponent]
    });

    fixture = TestBed.createComponent(OrdersPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersItemsComponent } from "./orders-items.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersItemsComponent", () => {

  let fixture: ComponentFixture<OrdersItemsComponent>;
  let component: OrdersItemsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersItemsComponent]
    });

    fixture = TestBed.createComponent(OrdersItemsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

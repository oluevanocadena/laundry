import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OrdersItemDescriptionComponent } from "@private/orders/components/item-description/orders-item-description.component";

describe("OrdersItemDescriptionComponent", () => {

  let fixture: ComponentFixture<OrdersItemDescriptionComponent>;
  let component: OrdersItemDescriptionComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersItemDescriptionComponent]
    });

    fixture = TestBed.createComponent(OrdersItemDescriptionComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

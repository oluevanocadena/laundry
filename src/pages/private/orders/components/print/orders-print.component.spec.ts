import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersPrintComponent } from "./orders-print.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersPrintComponent", () => {

  let fixture: ComponentFixture<OrdersPrintComponent>;
  let component: OrdersPrintComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersPrintComponent]
    });

    fixture = TestBed.createComponent(OrdersPrintComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

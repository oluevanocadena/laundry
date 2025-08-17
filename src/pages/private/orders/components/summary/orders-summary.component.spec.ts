import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersSummaryComponent } from "./orders-summary.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersSummaryComponent", () => {

  let fixture: ComponentFixture<OrdersSummaryComponent>;
  let component: OrdersSummaryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersSummaryComponent]
    });

    fixture = TestBed.createComponent(OrdersSummaryComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

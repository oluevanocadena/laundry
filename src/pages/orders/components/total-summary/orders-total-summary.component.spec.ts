import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersTotalSummaryComponent } from "./orders-total-summary.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersTotalSummaryComponent", () => {

  let fixture: ComponentFixture<OrdersTotalSummaryComponent>;
  let component: OrdersTotalSummaryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersTotalSummaryComponent]
    });

    fixture = TestBed.createComponent(OrdersTotalSummaryComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

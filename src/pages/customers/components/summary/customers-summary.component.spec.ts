import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersSummaryComponent } from "./customers-summary.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersSummaryComponent", () => {

  let fixture: ComponentFixture<CustomersSummaryComponent>;
  let component: CustomersSummaryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersSummaryComponent]
    });

    fixture = TestBed.createComponent(CustomersSummaryComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

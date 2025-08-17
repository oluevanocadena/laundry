import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PricingComponent } from "./pricing.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PricingComponent", () => {

  let fixture: ComponentFixture<PricingComponent>;
  let component: PricingComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PricingComponent]
    });

    fixture = TestBed.createComponent(PricingComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

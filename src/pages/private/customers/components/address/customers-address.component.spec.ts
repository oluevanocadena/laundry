import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersAddressComponent } from "./customers-address.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersAddressComponent", () => {

  let fixture: ComponentFixture<CustomersAddressComponent>;
  let component: CustomersAddressComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersAddressComponent]
    });

    fixture = TestBed.createComponent(CustomersAddressComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

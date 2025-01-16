import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersHeaderComponent } from "./customers-header.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersHeaderComponent", () => {

  let fixture: ComponentFixture<CustomersHeaderComponent>;
  let component: CustomersHeaderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersHeaderComponent]
    });

    fixture = TestBed.createComponent(CustomersHeaderComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

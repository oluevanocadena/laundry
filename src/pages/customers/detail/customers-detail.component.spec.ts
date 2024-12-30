import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersDetailComponent } from "./customers-detail.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersDetailComponent", () => {

  let fixture: ComponentFixture<CustomersDetailComponent>;
  let component: CustomersDetailComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersDetailComponent]
    });

    fixture = TestBed.createComponent(CustomersDetailComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

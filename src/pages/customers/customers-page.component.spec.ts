import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersPageComponent } from "./customers-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersPageComponent", () => {

  let fixture: ComponentFixture<CustomersPageComponent>;
  let component: CustomersPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersPageComponent]
    });

    fixture = TestBed.createComponent(CustomersPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

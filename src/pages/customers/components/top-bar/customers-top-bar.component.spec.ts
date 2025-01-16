import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersTopBarComponent } from "./customers-top-bar.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersTopBarComponent", () => {

  let fixture: ComponentFixture<CustomersTopBarComponent>;
  let component: CustomersTopBarComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersTopBarComponent]
    });

    fixture = TestBed.createComponent(CustomersTopBarComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

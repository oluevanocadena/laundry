import { NO_ERRORS_SCHEMA } from "@angular/core";
import { InputDateDropdownComponent } from "./input-date-dropdown.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("InputDateDropdownComponent", () => {

  let fixture: ComponentFixture<InputDateDropdownComponent>;
  let component: InputDateDropdownComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [InputDateDropdownComponent]
    });

    fixture = TestBed.createComponent(InputDateDropdownComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InputDateDropdownComponent } from "@components/atoms/input-date-dropdown/input-date-dropdown.component";

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

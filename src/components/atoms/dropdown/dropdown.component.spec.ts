import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DropdownComponent } from "@components/atoms/dropdown/dropdown.component";

describe("DropdownComponent", () => {

  let fixture: ComponentFixture<DropdownComponent>;
  let component: DropdownComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [DropdownComponent]
    });

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

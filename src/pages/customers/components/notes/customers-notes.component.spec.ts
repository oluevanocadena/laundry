import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersNotesComponent } from "./customers-notes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersNotesComponent", () => {

  let fixture: ComponentFixture<CustomersNotesComponent>;
  let component: CustomersNotesComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersNotesComponent]
    });

    fixture = TestBed.createComponent(CustomersNotesComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

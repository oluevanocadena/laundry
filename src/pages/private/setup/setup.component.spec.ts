import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SetupComponent } from "./setup.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SetupComponent", () => {

  let fixture: ComponentFixture<SetupComponent>;
  let component: SetupComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SetupComponent]
    });

    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

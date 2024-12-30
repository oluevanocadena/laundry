import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RegisterPageComponent } from "./register-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("RegisterPageComponent", () => {

  let fixture: ComponentFixture<RegisterPageComponent>;
  let component: RegisterPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [RegisterPageComponent]
    });

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

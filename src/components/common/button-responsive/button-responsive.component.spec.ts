import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ButtonResponsiveComponent } from "./button-responsive.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ButtonResponsiveComponent", () => {

  let fixture: ComponentFixture<ButtonResponsiveComponent>;
  let component: ButtonResponsiveComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ButtonResponsiveComponent]
    });

    fixture = TestBed.createComponent(ButtonResponsiveComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

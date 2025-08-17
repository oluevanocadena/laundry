import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LandingComponent } from "./landing.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LandingComponent", () => {

  let fixture: ComponentFixture<LandingComponent>;
  let component: LandingComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LandingComponent]
    });

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

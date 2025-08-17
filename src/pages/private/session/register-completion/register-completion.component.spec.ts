import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RegisterCompletionComponent } from "./register-completion.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("RegisterCompletionComponent", () => {

  let fixture: ComponentFixture<RegisterCompletionComponent>;
  let component: RegisterCompletionComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [RegisterCompletionComponent]
    });

    fixture = TestBed.createComponent(RegisterCompletionComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

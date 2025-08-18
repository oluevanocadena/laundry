import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RegisterConfirmComponent } from "./register-confirm.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("RegisterConfirmComponent", () => {

  let fixture: ComponentFixture<RegisterConfirmComponent>;
  let component: RegisterConfirmComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [RegisterConfirmComponent]
    });

    fixture = TestBed.createComponent(RegisterConfirmComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

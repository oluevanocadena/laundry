import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LoginPageComponent } from "./login-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LoginPageComponent", () => {

  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LoginPageComponent]
    });

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

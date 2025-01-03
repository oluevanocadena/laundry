import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LogoComponent } from "./logo.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LogoComponent", () => {

  let fixture: ComponentFixture<LogoComponent>;
  let component: LogoComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LogoComponent]
    });

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

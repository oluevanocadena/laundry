import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SupportComponent } from "./support.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SupportComponent", () => {

  let fixture: ComponentFixture<SupportComponent>;
  let component: SupportComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SupportComponent]
    });

    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

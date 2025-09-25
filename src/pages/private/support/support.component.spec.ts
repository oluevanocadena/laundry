import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SupportPageComponent } from "@private/support/support.component";

describe("SupportComponent", () => {

  let fixture: ComponentFixture<SupportPageComponent>;
  let component: SupportPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SupportPageComponent]
    });

    fixture = TestBed.createComponent(SupportPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

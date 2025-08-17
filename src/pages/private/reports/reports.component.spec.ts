import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReportsComponent } from "./reports.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ReportsComponent", () => {

  let fixture: ComponentFixture<ReportsComponent>;
  let component: ReportsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ReportsComponent]
    });

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

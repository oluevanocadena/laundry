import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AnalyticsPageComponent } from "./analytics-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AnalyticsPageComponent", () => {

  let fixture: ComponentFixture<AnalyticsPageComponent>;
  let component: AnalyticsPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AnalyticsPageComponent]
    });

    fixture = TestBed.createComponent(AnalyticsPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

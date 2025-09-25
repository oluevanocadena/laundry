import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AnalyticsPageComponent } from "@private/analytics/analytics-page.component";

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

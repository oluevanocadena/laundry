import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LineChartComponent } from "./line-chart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LineChartComponent", () => {

  let fixture: ComponentFixture<LineChartComponent>;
  let component: LineChartComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LineChartComponent]
    });

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

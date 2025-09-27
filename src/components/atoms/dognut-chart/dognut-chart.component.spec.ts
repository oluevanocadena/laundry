import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DognutChartComponent } from "./dognut-chart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("DognutChartComponent", () => {

  let fixture: ComponentFixture<DognutChartComponent>;
  let component: DognutChartComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [DognutChartComponent]
    });

    fixture = TestBed.createComponent(DognutChartComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

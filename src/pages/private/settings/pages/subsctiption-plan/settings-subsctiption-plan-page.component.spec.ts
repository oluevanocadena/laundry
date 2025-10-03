import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsSubsctiptionPlanPageComponent } from "./settings-subsctiption-plan-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsSubsctiptionPlanPageComponent", () => {

  let fixture: ComponentFixture<SettingsSubsctiptionPlanPageComponent>;
  let component: SettingsSubsctiptionPlanPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsSubsctiptionPlanPageComponent]
    });

    fixture = TestBed.createComponent(SettingsSubsctiptionPlanPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

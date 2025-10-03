import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsSubsctiptionPlanGeneralComponent } from "./settings-subsctiption-plan-general.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsSubsctiptionPlanGeneralComponent", () => {

  let fixture: ComponentFixture<SettingsSubsctiptionPlanGeneralComponent>;
  let component: SettingsSubsctiptionPlanGeneralComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsSubsctiptionPlanGeneralComponent]
    });

    fixture = TestBed.createComponent(SettingsSubsctiptionPlanGeneralComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

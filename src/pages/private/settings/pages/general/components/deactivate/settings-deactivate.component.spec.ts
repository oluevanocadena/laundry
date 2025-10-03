import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsDeactivateComponent } from "./settings-deactivate.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsDeactivateComponent", () => {

  let fixture: ComponentFixture<SettingsDeactivateComponent>;
  let component: SettingsDeactivateComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsDeactivateComponent]
    });

    fixture = TestBed.createComponent(SettingsDeactivateComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsBillingPageComponent } from "./settings-billing-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsBillingPageComponent", () => {

  let fixture: ComponentFixture<SettingsBillingPageComponent>;
  let component: SettingsBillingPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsBillingPageComponent]
    });

    fixture = TestBed.createComponent(SettingsBillingPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

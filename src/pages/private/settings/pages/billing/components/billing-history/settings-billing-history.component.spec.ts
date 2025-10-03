import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsBillingHistoryComponent } from "./settings-billing-history.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsBillingHistoryComponent", () => {

  let fixture: ComponentFixture<SettingsBillingHistoryComponent>;
  let component: SettingsBillingHistoryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsBillingHistoryComponent]
    });

    fixture = TestBed.createComponent(SettingsBillingHistoryComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

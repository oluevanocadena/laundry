import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsPointOfSaleGeneralComponent } from "./settings-point-of-sale-general.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsPointOfSaleGeneralComponent", () => {

  let fixture: ComponentFixture<SettingsPointOfSaleGeneralComponent>;
  let component: SettingsPointOfSaleGeneralComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsPointOfSaleGeneralComponent]
    });

    fixture = TestBed.createComponent(SettingsPointOfSaleGeneralComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

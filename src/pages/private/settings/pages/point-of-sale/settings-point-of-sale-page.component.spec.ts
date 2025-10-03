import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsPointOfSalePageComponent } from "./settings-point-of-sale-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsPointOfSalePageComponent", () => {

  let fixture: ComponentFixture<SettingsPointOfSalePageComponent>;
  let component: SettingsPointOfSalePageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsPointOfSalePageComponent]
    });

    fixture = TestBed.createComponent(SettingsPointOfSalePageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

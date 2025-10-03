import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsStoreGeneralComponent } from "./settings-store-general.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsStoreGeneralComponent", () => {

  let fixture: ComponentFixture<SettingsStoreGeneralComponent>;
  let component: SettingsStoreGeneralComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsStoreGeneralComponent]
    });

    fixture = TestBed.createComponent(SettingsStoreGeneralComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

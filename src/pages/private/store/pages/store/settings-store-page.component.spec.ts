import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsStorePageComponent } from "./settings-store-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsStorePageComponent", () => {

  let fixture: ComponentFixture<SettingsStorePageComponent>;
  let component: SettingsStorePageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsStorePageComponent]
    });

    fixture = TestBed.createComponent(SettingsStorePageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

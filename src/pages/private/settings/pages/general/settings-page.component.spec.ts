import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SettingsPageComponent } from "@pages/private/settings/pages/general/settings-page.component";

describe("SettingsPageComponent", () => {

  let fixture: ComponentFixture<SettingsPageComponent>;
  let component: SettingsPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsPageComponent]
    });

    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

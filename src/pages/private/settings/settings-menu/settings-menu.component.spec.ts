import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsMenuComponent } from "./settings-menu.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsMenuComponent", () => {

  let fixture: ComponentFixture<SettingsMenuComponent>;
  let component: SettingsMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsMenuComponent]
    });

    fixture = TestBed.createComponent(SettingsMenuComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

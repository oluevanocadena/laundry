import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsGeneralsComponent } from "./settings-generals.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsGeneralsComponent", () => {

  let fixture: ComponentFixture<SettingsGeneralsComponent>;
  let component: SettingsGeneralsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsGeneralsComponent]
    });

    fixture = TestBed.createComponent(SettingsGeneralsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
